import { LinearGradient } from 'expo'
import React from 'react'
import Colors from '../../../constants/Colors';
import styled from 'styled-components/native'

const SettingsContainer = styled.View`
  flex-grow: 1;
  background-color: rgba(168, 88, 108, 1);
`

const LinearGradinetView = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
`

export const SettingsView = props => (
  <SettingsContainer>
    <LinearGradinetView colors={[Colors.backgroundColor, '#902E46', 'transparent']}>
      {props.children}
    </LinearGradinetView>
  </SettingsContainer>
)