
import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleList } from '.';
import { MemoryRouter } from 'react-router-dom';

describe('ArticleList Component', () => {
    it('renders the article list component', () => {
        render(
            <MemoryRouter>
                <ArticleList fetchedArticles={[]} />
            </MemoryRouter>
        );
        const titleElement = screen.getByText('Articles');
        expect(titleElement).toBeInTheDocument();
    });

    it('displays articles', () => {
        const articles = [
            { id: 1, title: 'Article 1', content: 'Content 1' },
            { id: 2, title: 'Article 2', content: 'Content 2' },
        ];
        render(
            <MemoryRouter>
                <ArticleList fetchedArticles={articles} />
            </MemoryRouter>
        );

        const article1 = screen.getByText('Article 1');
        const article2 = screen.getByText('Article 2');

        expect(article1).toBeInTheDocument();
        expect(article2).toBeInTheDocument();
    });

    it('opens the edit modal when edit button is clicked', () => {
        const articles = [
            { id: 1, title: 'Article 1', content: 'Content 1' },
        ];
        render(
            <MemoryRouter>
                <ArticleList fetchedArticles={articles} />
            </MemoryRouter>
        );

        const editButton = screen.getByText('Edit');
        fireEvent.click(editButton);

    });

    it('deletes an article when delete button is clicked', () => {
        const articles = [
            { id: 1, title: 'Article 1', content: 'Content 1' },
        ];
        render(
            <MemoryRouter>
                <ArticleList fetchedArticles={articles} />
            </MemoryRouter>
        );

        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);
    });
});

