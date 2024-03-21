import { theme } from '@hcc/styles';
import { Text, Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

type TeamSelectionProps = {
  form: UseFormReturnType<{
    sportsId: string;
    startTime: Date;
    gameName: string;
    videoId: string;
    teamIds: string[];
    round: string;
  }>;
  leagueTeamList: { value: string; label: string }[];
};

export default function TeamSelection({
  form,
  leagueTeamList,
}: TeamSelectionProps) {
  return (
    <>
      <Text mt="lg" c={theme.colors.gray[4]}>
        참가 팀
      </Text>
      <Select
        label="팀1"
        data={leagueTeamList}
        placeholder="팀을 선택해주세요"
        withAsterisk
        {...form.getInputProps('teamIds.0')}
      />
      <Select
        label="팀2"
        data={leagueTeamList}
        placeholder="팀을 선택해주세요"
        withAsterisk
        {...form.getInputProps('teamIds.1')}
      />
    </>
  );
}
