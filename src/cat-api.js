
export function fetchBreeds() {

    const x_api_key = "live_WIUfIsghAjrYOKYekOUKMlSfrNDZdue6Ng3g2IUhk0JLeIVGkRzgCDVVS37bL3Rh";
    const url = 'https://api.thecatapi.com/v1/breeds';

    return fetch(`${url}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
};

export function fetchCatByBreed(breedId) {
    const x_api_key = "live_WIUfIsghAjrYOKYekOUKMlSfrNDZdue6Ng3g2IUhk0JLeIVGkRzgCDVVS37bL3Rh";
    const base_url = 'https://api.thecatapi.com/v1';
    return fetch(`${base_url}/images/search?breed_ids=${breedId}&api_key=${x_api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        });
}