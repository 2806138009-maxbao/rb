"""Data layer abstractions for the question search application."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Optional
import json


@dataclass(slots=True)
class KnowledgeBaseEntry:
    """Represents a single knowledge base entry."""

    identifier: str
    content: str
    metadata: dict[str, str] | None = None


class KnowledgeBase:
    """In-memory knowledge base loaded from JSON lines files."""

    def __init__(self) -> None:
        self._entries: list[KnowledgeBaseEntry] = []

    def load_files(self, paths: Iterable[Path]) -> None:
        """Load entries from the provided JSON lines files."""

        for path in paths:
            with Path(path).open("r", encoding="utf8") as file:
                for line in file:
                    record = json.loads(line)
                    self._entries.append(
                        KnowledgeBaseEntry(
                            identifier=str(record["id"]),
                            content=str(record["content"]),
                            metadata=record.get("metadata") or None,
                        )
                    )

    def add(self, entry: KnowledgeBaseEntry) -> None:
        """Add a new entry to the knowledge base."""

        self._entries.append(entry)

    def entries(self) -> list[KnowledgeBaseEntry]:
        """Return a copy of the loaded entries."""

        return list(self._entries)

    def get(self, identifier: str) -> Optional[KnowledgeBaseEntry]:
        """Retrieve an entry by identifier."""

        for entry in self._entries:
            if entry.identifier == identifier:
                return entry
        return None

    def __len__(self) -> int:  # pragma: no cover - trivial
        return len(self._entries)
