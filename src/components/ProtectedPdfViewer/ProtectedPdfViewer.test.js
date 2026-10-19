import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Document } from 'react-pdf';
import ProtectedPdfViewer from './ProtectedPdfViewer';

jest.mock('react-pdf', () => ({
  pdfjs: { version: 'test', GlobalWorkerOptions: {} },
  Document: jest.fn(() => <div>PDF document</div>),
  Page: () => null
}));

afterEach(() => {
  cleanup(); jest.clearAllMocks();
  document.documentElement.removeAttribute('data-explore-motion');
});

test('PDF loading waits until Explore motion ends, including cancellation', () => {
  document.documentElement.dataset.exploreMotion = 'ink';
  render(<ProtectedPdfViewer pdfPath="/test.pdf" />);
  expect(Document).not.toHaveBeenCalled();
  document.documentElement.removeAttribute('data-explore-motion');
  fireEvent(document, new Event('explore-motion-end'));
  expect(Document).toHaveBeenCalled();
});

test('direct navigation loads the PDF without waiting for a transition event', () => {
  render(<ProtectedPdfViewer pdfPath="/test.pdf" />);
  expect(Document).toHaveBeenCalled();
});
