import React, { useEffect } from "react";
import usePlayerStore from "@stores/playerStore";
import { useOutletContext } from "react-router-dom";
import TeamSongComp from "@components/Main/Player/TeamSongComp";
import EmptyState from "@components/Share/EmptyState";
import EmptyIcon from "@assets/EmptyState/EmptyState_Song.svg?react"
const TeamSongView = ({ }) => {
  const { activeBtn } = useOutletContext()
  const { fetchTeamSongs, teamSongs } = usePlayerStore();

  useEffect(() => {
    const loadTeamSongs = () => {
      if (!teamSongs || teamSongs.length == 0){
        fetchTeamSongs();
      }
    }
    loadTeamSongs();
  }, [fetchTeamSongs])
 
  const renderTeamSongs = () => {
    switch (activeBtn){
    case 0:
      const officialSongs = teamSongs.filter((song) => song.type == "OFFICIAL")
      return (
        officialSongs ?
        <TeamSongComp songs={officialSongs}/> 
        :
        <></>
      )
    case 1:
      const nonOfficialSongs = teamSongs.filter((song) => song.type == "NON-OFFICIAL")
      return (
        nonOfficialSongs && nonOfficialSongs.length > 0 ?
        <TeamSongComp songs={nonOfficialSongs}/> 
        :
        <EmptyState
          icon = {EmptyIcon}
          state="noSongs"
        />
      )
    }
  }
  return (
    <>
      {renderTeamSongs()}
    </>
  );
};

export default TeamSongView;
