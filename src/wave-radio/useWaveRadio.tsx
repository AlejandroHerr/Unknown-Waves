import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import useInterval from '../hooks/useInterval';
import { RADIO_URL, TRAK_INFO_URL } from './constants';
import { TrackInfo, WaveRadioStation } from './types';

export interface UseWaveRadioInput {
  station: WaveRadioStation;
  brief?: boolean;
  trackInfoRefreshInterval?: number;
}

export interface UseWaveRadioOutput {
  stationUrl: string;
  trackInfo: TrackInfo;
}

export const useWaveRadio = ({
  station,
  brief = true,
  trackInfoRefreshInterval = 5000,
}: UseWaveRadioInput): UseWaveRadioOutput => {
  const stationUrl = RADIO_URL.replace(':station', station);

  const [trackInfo, setTrackInfo] = useState({ artist: 'Artist', title: 'Title' });

  const fetchTrackInfo = useCallback(() => {
    axios
      .get(TRAK_INFO_URL, {
        //@ts-ignore
        crossDomain: true,
        params: { station: station, brief: brief ? 1 : 0 },
      })
      .then((response: AxiosResponse<{ status: number; payload: string }>) => {
        const { payload } = response.data;

        const [artist, title] = payload.split(' - ') as [string, string];

        setTrackInfo({ artist, title });
      })
      .catch(() => console.error('Error fetching track info'));
  }, [brief, station]);

  useEffect(() => {
    fetchTrackInfo();
  }, [fetchTrackInfo]);

  useInterval(fetchTrackInfo, { delay: trackInfoRefreshInterval });

  return { stationUrl, trackInfo };
};
