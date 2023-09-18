const URL = "https://jsonplaceholder.typicode.com" //change it

export const fetchArticles = async () => {
    try {
        const response = await fetch(`${URL}/posts`);

        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        throw new Error(err);
    }
}

