"""End-to-end pipeline orchestrating OCR, retrieval and answer synthesis."""

from __future__ import annotations

from pathlib import Path
from typing import Iterable

from .config import AppConfig
from .data_sources import KnowledgeBase, KnowledgeBaseEntry
from .llm import AnswerSynthesizer
from .ocr import OCRService
from .retriever import KeywordRetriever, RetrievedDocument


class QuestionAnsweringPipeline:
    """High-level pipeline orchestrating the question search flow."""

    def __init__(
        self,
        *,
        config: AppConfig,
        knowledge_base: KnowledgeBase,
        retriever_factory=KeywordRetriever.from_entries,
        synthesizer: AnswerSynthesizer | None = None,
        ocr_service: OCRService | None = None,
    ) -> None:
        self._config = config
        self._knowledge_base = knowledge_base
        self._retriever_factory = retriever_factory
        self._synthesizer = synthesizer or AnswerSynthesizer()
        self._ocr_service = ocr_service
        self._retriever: KeywordRetriever | None = None

    def load_knowledge_base(self) -> None:
        """Load knowledge base entries from the configured files."""

        paths = self._config.resolve_paths()
        if paths:
            self._knowledge_base.load_files(paths)
        self._retriever = self._retriever_factory(self._knowledge_base.entries())

    def answer(self, query: str | None = None, *, image_path: Path | None = None) -> str:
        """Answer a question using text or an image."""

        question_text = self._ensure_question(query, image_path)
        retriever = self._ensure_retriever()
        documents = retriever.retrieve(question_text, limit=self._config.max_candidates)
        return self._synthesizer.synthesize(question_text, documents)

    def _ensure_question(self, query: str | None, image_path: Path | None) -> str:
        if query:
            return query
        if image_path and self._ocr_service:
            return self._ocr_service.extract_text(image_path)
        raise ValueError("Either query text or image_path with OCR service must be provided")

    def _ensure_retriever(self) -> KeywordRetriever:
        if not self._retriever:
            self.load_knowledge_base()
        assert self._retriever is not None, "Retriever failed to initialize"
        return self._retriever

    @property
    def knowledge_base(self) -> Iterable[KnowledgeBaseEntry]:
        return self._knowledge_base.entries()
