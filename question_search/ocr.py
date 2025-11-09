"""Lightweight OCR abstraction used by the pipeline."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Protocol


class OCRService(Protocol):
    """Protocol describing OCR services."""

    def extract_text(self, image_path: Path) -> str:
        """Extract text from an image located at ``image_path``."""


@dataclass(slots=True)
class DummyOCRService:
    """Simple OCR implementation that mimics OCR for prototyping.

    The service does not perform real OCR. Instead it reads plain text files or
    returns a placeholder string if the provided path does not exist. This keeps
    the pipeline testable without heavy external dependencies.
    """

    fallback_text: str = ""

    def extract_text(self, image_path: Path) -> str:
        if image_path.exists() and image_path.suffix in {".txt", ""}:
            return image_path.read_text(encoding="utf8")
        return self.fallback_text or f"[unavailable text from {image_path.name}]"
