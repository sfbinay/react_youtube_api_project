import axios from "axios";

const api_key = "AIzaSyCaGzNyZyM6srK62TuaaEy1zI7uKxB8db8";

const service = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    timeout: 3000
});

export function searchVideo(search: string) {

    const prm = {
        part: "snippet",
        q: search,
        type: "video",
        key: `${api_key}`
    }

    return service.get("/search", { params: prm })
}

export function mostPopularVideos() {

    const prm = {
        part: "snippet",
        chart: "mostPopular",
        regionCode: "tr",
        maxResults: "6",
        key: `${api_key}`
    }

    return service.get("/videos", { params: prm })
}