"""Retrieval utilities for matching questions to knowledge base entries."""

from __future__ import annotations

import math
import re
from collections import Counter
from dataclasses import dataclass
from typing import Iterable, Sequence

from .data_sources import KnowledgeBaseEntry

TOKEN_PATTERN = re.compile(r"\w+")


def tokenize(text: str) -> list[str]:
    """Tokenize text into lowercase word tokens."""

    return [token.lower() for token in TOKEN_PATTERN.findall(text)]


def cosine_similarity(a: Counter[str], b: Counter[str]) -> float:
    """Compute cosine similarity between two token frequency counters."""

    numerator = sum(a[token] * b[token] for token in a.keys() & b.keys())
    if numerator == 0:
        return 0.0
    sum_a = sum(value * value for value in a.values())
    sum_b = sum(value * value for value in b.values())
    return numerator / math.sqrt(sum_a * sum_b)


@dataclass(slots=True)
class RetrievedDocument:
    """Document returned by the retriever along with a relevance score."""

    entry: KnowledgeBaseEntry
    score: float


class KeywordRetriever:
    """Retriever based on keyword cosine similarity."""

    def __init__(self, entries: Iterable[KnowledgeBaseEntry]):
        self._documents = [(entry, Counter(tokenize(entry.content))) for entry in entries]

    def retrieve(self, query: str, *, limit: int = 5) -> list[RetrievedDocument]:
        """Return up to ``limit`` documents most similar to ``query``."""

        query_vector = Counter(tokenize(query))
        scored: list[RetrievedDocument] = []
        for entry, token_counts in self._documents:
            score = cosine_similarity(query_vector, token_counts)
            if score > 0:
                scored.append(RetrievedDocument(entry=entry, score=score))
        scored.sort(key=lambda doc: doc.score, reverse=True)
        return scored[:limit]

    @classmethod
    def from_entries(cls, entries: Sequence[KnowledgeBaseEntry]) -> "KeywordRetriever":
        return cls(entries)
