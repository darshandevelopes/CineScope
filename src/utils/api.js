import Config from 'react-native-config';
import {formatVoteCount} from '../utils/formatters';

export async function fetchData(type, listName, page) {
  const API_TOKEN = Config.API_TOKEN;
  const URL = Config.API_URL;
  try {
    const response = await fetch(
      `${URL}/${type}/${listName}?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );
    const data = await response.json();
    const formattedData = {
      data: data.results.map(item => ({
        title: type === 'movie' ? item.original_title : item.original_name,
        image: item.poster_path,
        stars: item.vote_average,
        ratings: formatVoteCount(item.vote_count),
        id: item.id,
        type: type,
      })),
    };

    return formattedData;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function fetchDetails(type, id) {
  const API_TOKEN = Config.API_TOKEN;
  const URL = Config.API_URL;
  try {
    const response = await fetch(`${URL}/${type}/${id}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const data = await response.json();
    const formattedData = {
      title: type === 'movie' ? data.original_title : data.original_name,
      image: data.poster_path,
      stars: data.vote_average,
      ratings: formatVoteCount(data.vote_count),
      id: data.id,
      type: type,
      overview: data.overview,
      genres: data.genres.map(genre => genre.name).join(', '),
      date: type === 'movie' ? data.release_date : data.first_air_date,
    };
    return formattedData;
  } catch (e) {
    console.log(e);
  }
  return null;
}
