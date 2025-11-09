"""Answer synthesis tools for the question search pipeline."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

from .retriever import RetrievedDocument


@dataclass(slots=True)
class AnswerSnippet:
    """Formatted answer snippet returned to the user."""

    source_id: str
    content: str
    score: float


class AnswerSynthesizer:
    """Create a concise answer using retrieved documents."""

    def __init__(self, *, max_snippets: int = 3) -> None:
        self._max_snippets = max_snippets

    def synthesize(self, query: str, documents: Iterable[RetrievedDocument]) -> str:
        """Generate an answer by combining the top retrieved documents."""

        snippets = self._build_snippets(documents)
        if not snippets:
            return "No relevant documents were found."

        bullet_lines = [f"- ({snippet.score:.2f}) [{snippet.source_id}] {snippet.content}" for snippet in snippets]
        return "\n".join([f"Question: {query}", "Suggested answers:"] + bullet_lines)

    def _build_snippets(self, documents: Iterable[RetrievedDocument]) -> list[AnswerSnippet]:
        snippets: list[AnswerSnippet] = []
        for document in documents:
            snippets.append(
                AnswerSnippet(
                    source_id=document.entry.identifier,
                    content=document.entry.content.strip(),
                    score=document.score,
                )
            )
            if len(snippets) >= self._max_snippets:
                break
        return snippets
