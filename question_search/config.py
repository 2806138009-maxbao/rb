"""Configuration helpers for the question search pipeline."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Sequence


@dataclass(slots=True)
class AppConfig:
    """Application configuration for the question search prototype.

    Attributes
    ----------
    knowledge_base_paths:
        Sequence of file paths containing knowledge base entries in JSON lines
        format. Each line should contain the keys ``"id"``, ``"content"`` and
        optionally ``"metadata"``.
    max_candidates:
        Maximum number of documents the retriever should return when answering a
        question.
    """

    knowledge_base_paths: Sequence[Path] = field(default_factory=list)
    max_candidates: int = 5

    def resolve_paths(self) -> list[Path]:
        """Resolve knowledge base paths to absolute paths.

        Returns
        -------
        list[Path]
            Absolute paths to the configured knowledge base files.
        """

        return [Path(path).expanduser().resolve() for path in self.knowledge_base_paths]
