# Question Search Prototype

This repository contains a lightweight Python prototype that models the core
components of a question search system. It demonstrates how OCR, keyword-based
retrieval, and answer synthesis can be orchestrated into a simple pipeline. The
code is organised to help you plug in production-ready modules (OCR engines,
vector databases, large language models) once you are ready to move beyond the
prototype stage.

## Features

- **Knowledge base management**: Load structured entries from JSONL files or add
  them programmatically.
- **Keyword retrieval**: A cosine-similarity retriever implemented without heavy
  dependencies, suitable for unit tests and rapid experiments.
- **Answer synthesis**: Simple summariser that formats retrieved passages for
  display.
- **OCR abstraction**: Dummy OCR service that reads from plain text files,
  making it straightforward to swap in PaddleOCR, Tesseract, or commercial APIs.
- **CLI entry point**: Run the pipeline from the command line to test workflows
  end-to-end.

## Getting Started

1. Create and activate a Python 3.10+ virtual environment.
2. Install the package in editable mode:

   ```bash
   pip install -e .
   ```

3. Prepare a JSON Lines knowledge base file:

   ```jsonl
   {"id": "physics-newton", "content": "Newton's second law states that force equals mass times acceleration."}
   {"id": "chemistry-moles", "content": "The mole relates the number of particles to Avogadro's constant."}
   ```

4. Run the CLI:

   ```bash
   python -m question_search.main "What is Newton's second law?" --kb path/to/knowledge_base.jsonl
   ```

   or supply an image placeholder (a `.txt` file in this prototype):

   ```bash
   python -m question_search.main --image path/to/question.txt --kb path/to/knowledge_base.jsonl
   ```

5. Execute the tests:

   ```bash
   pytest
   ```

## Extending the Prototype

- Replace `DummyOCRService` with a real OCR backend by implementing the
  `OCRService` protocol.
- Swap `KeywordRetriever` for a vector database powered retriever (FAISS,
  Milvus, Weaviate) by implementing a compatible interface.
- Integrate a large language model in `AnswerSynthesizer` to produce richer
  explanations or step-by-step solutions.
- Expand the knowledge base schema to support metadata such as source material,
  difficulty level, or curriculum tags.
