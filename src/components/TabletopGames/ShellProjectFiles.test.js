import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShellProjectFiles from './ShellProjectFiles';
import { shellMaterials } from './shellOrHighWaters';

test('material cards switch one inline preview and its original-file links', () => {
  render(<ShellProjectFiles />);
  const rulebook = screen.getByRole('region', { name: 'Rulebook preview' });
  expect(within(rulebook).getAllByRole('img')).toHaveLength(2);
  expect(screen.getByRole('link', { name: 'View Rules' })).toHaveAttribute('href', shellMaterials.rulebook.original);
  for (const file of shellMaterials.components) {
    fireEvent.click(screen.getByRole('button', { name: new RegExp('^' + file.title) }));
    const preview = screen.getByRole('region', { name: file.title + ' preview' });
    expect(within(preview).getByRole('img')).toHaveAttribute('src', file.src);
    expect(screen.getByRole('link', { name: 'View File' })).toHaveAttribute('href', file.original);
    expect(screen.getAllByRole('heading', { name: 'Preview' })).toHaveLength(1);
  }
});

test('gameplay thumbnails switch the inline photo without opening a separate viewer', () => {
  render(<ShellProjectFiles />);
  fireEvent.click(screen.getByRole('button', { name: 'View gameplay photo 3' }));
  expect(screen.getByRole('img', { name: shellMaterials.photos[2].caption })).toHaveAttribute('src', shellMaterials.photos[2].src);
  expect(screen.getByRole('button', { name: 'View gameplay photo 1' })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('button', { name: 'View gameplay photo 3' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
