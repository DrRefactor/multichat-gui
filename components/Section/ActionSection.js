import React from 'react'
import styled from 'styled-components/native'
import Images from '../../constants/Images'

export function ActionButton(props) {
  const { title, image } = props
  return (
    <ActionButtonContainer>
      <ActionButtonContent {...props} >
        <ActionButtonText>{title}</ActionButtonText>
        {image && <ActionButtonImage source={Images[image]}/>}
      </ActionButtonContent>
    </ActionButtonContainer>
  )
}

const ActionButtonContainer = styled.View`
  margin: auto;
`

const ActionButtonContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 15px;
  margin-bottom: 55px;
`

const ActionButtonText = styled.Text`
  font-size: 33px;
  font-family: 'indie-flower';
  color: #fff;          
  padding: 8px 20px;
`

const ActionButtonImage = styled.Image`
`

export const ActionsSection = styled.View`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  padding: 8px;
`