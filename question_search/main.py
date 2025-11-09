"""Command line entry point for experimenting with the pipeline."""

from __future__ import annotations

import argparse
from pathlib import Path

from .config import AppConfig
from .data_sources import KnowledgeBase
from .ocr import DummyOCRService
from .pipeline import QuestionAnsweringPipeline


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Question search prototype")
    parser.add_argument("question", nargs="?", help="Textual question to answer")
    parser.add_argument("--image", type=Path, help="Image file containing the question")
    parser.add_argument(
        "--kb",
        type=Path,
        action="append",
        dest="knowledge_base_paths",
        help="Path to a JSON lines file with knowledge base entries",
    )
    parser.add_argument(
        "--max-candidates",
        type=int,
        default=5,
        help="Maximum number of documents to retrieve",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    config = AppConfig(
        knowledge_base_paths=args.knowledge_base_paths or [],
        max_candidates=args.max_candidates,
    )
    knowledge_base = KnowledgeBase()
    pipeline = QuestionAnsweringPipeline(
        config=config,
        knowledge_base=knowledge_base,
        ocr_service=DummyOCRService(),
    )
    pipeline.load_knowledge_base()
    answer = pipeline.answer(query=args.question, image_path=args.image)
    print(answer)
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI entry point
    raise SystemExit(main())
