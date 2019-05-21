import React from 'react'
import styled from 'styled-components/native'

export function Section({ title, children }) {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionHeaderText>
          {title}
        </SectionHeaderText>
      </SectionHeader>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  )
}

const SectionContainer = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`

const SectionContent = styled.View``

const SectionHeader = styled.View`
  padding: 12px;
`

const SectionHeaderText = styled.Text`
  font-size: 33px;
  font-family: 'indie-flower';
  margin: auto;
  color: #fff;
`

export const SectionContentText = styled.Text`
  font-size: 14px;
  padding: 8px;
  background-color: #fdfdfd;
`

export const TextField = styled.TextInput`
  margin: 20px;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  color: #000;
  font-family: 'gill-sans';
`