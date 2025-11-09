from pathlib import Path

from question_search.config import AppConfig
from question_search.data_sources import KnowledgeBase, KnowledgeBaseEntry
from question_search.ocr import DummyOCRService
from question_search.pipeline import QuestionAnsweringPipeline


def build_pipeline() -> QuestionAnsweringPipeline:
    knowledge_base = KnowledgeBase()
    knowledge_base.add(
        KnowledgeBaseEntry(
            identifier="physics-newton",
            content="Newton's second law states that force equals mass times acceleration.",
        )
    )
    knowledge_base.add(
        KnowledgeBaseEntry(
            identifier="chemistry-moles",
            content="The mole relates the number of particles to Avogadro's constant.",
        )
    )
    config = AppConfig(knowledge_base_paths=[], max_candidates=3)
    return QuestionAnsweringPipeline(
        config=config,
        knowledge_base=knowledge_base,
        ocr_service=DummyOCRService(fallback_text="Describe Newton's law"),
    )


def test_answer_from_text_query():
    pipeline = build_pipeline()
    result = pipeline.answer(query="What is Newton's second law?")
    assert "physics-newton" in result
    assert "mass times acceleration" in result


def test_answer_from_image_uses_ocr(tmp_path: Path):
    image_text = "Explain the concept of mole in chemistry."
    image_path = tmp_path / "question.txt"
    image_path.write_text(image_text, encoding="utf8")

    pipeline = build_pipeline()
    result = pipeline.answer(image_path=image_path)
    assert "chemistry-moles" in result
    assert "Avogadro" in result
