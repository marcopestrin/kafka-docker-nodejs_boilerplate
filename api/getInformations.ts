import dotenv from 'dotenv';
dotenv.config();

const { APP_ID, APP_KEY } = process.env;
import axios from 'axios';

import sendMessage from '../producer';
import { environment } from '../const';

function getStringByteSize(str: string) {
  return Buffer.from(str, 'utf-8').length;
}

function splitMessageIntoChunks(message: string, chunkSize: number): string[] {
  const chunks = [];
  for (let i = 0; i < message.length; i += chunkSize) {
    chunks.push(message.slice(i, i + chunkSize));
  }
  return chunks;
}


const getPlaceholder = async () => {

  const options = {
    method: 'GET',
    url: 'https://coinmap.org/api/v1/venues/',
  };
  
  try {
    const response = await axios.request(options);
    let { data } = response

    const maxChunkSize = 1024 * 512;
    data = JSON.stringify(data);
    const dataSize = getStringByteSize(data)

    if (dataSize > maxChunkSize) {
      const messageChunks = splitMessageIntoChunks(data, maxChunkSize);
      for (const chunk of messageChunks) {
        await sendMessage(environment.TOPIC, chunk);
      }
    } else {

    }
  } catch (error) {
    console.error(error);
  }

};

getPlaceholder();
