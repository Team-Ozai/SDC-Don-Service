import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Story from './Story.jsx'
import RisksAndChallenges from './RisksAndChallenges.jsx'
import EnvironmentalCommitments from './EnvironmentalCommitments.jsx'
import Nav from './style/Nav.js'
import NavContainer from './style/NavContainer.js'
import NavTitle from './style/NavTitle.js'
import Wrapper from './style/Wrapper.js'
import LeftMain from './style/LeftMain.js'
import Link from './style/Link.js'
import RefDiv from './style/RefDiv.js'

class Campaign extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      story : {},
      risksAndChallenges : {},
      environmentalCommitments : {},
    }

    this.storyText = React.createRef()
    this.risksAndChallengesText = React.createRef()
    this.environmentalCommitmentsText = React.createRef()

    this.refStory = React.createRef()
    this.refRisksAndChallenges = React.createRef()
    this.refEnvironmentalCommitments = React.createRef()

    this.handleClickStory = this.handleClickStory.bind(this)
    this.handleClickRisksAndChallenges = this.handleClickRisksAndChallenges.bind(this)
    this.handleClickEnvironmentalCommitments = this.handleClickEnvironmentalCommitments.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount(){
    this.storyText.current.focus();
    window.addEventListener('scroll', this.handleScroll);
    this.fetchStory();
    this.fetchRisksAndChallenges();
    this.fetchEnvironmentalChallenges();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.refStory);
  }

  focus(text) {
    if (text === "story") {
      this.storyText.current.focus();
    } else if (text === "risksAndChallenges") {
      this.risksAndChallengesText.current.focus()
    }else if (text === "environmentalCommitments") {
      this.environmentalCommitmentsText.current.focus()
    }
  }

  handleScroll(event) {
    if (
      window.pageYOffset >= (this.refStory.current.offsetTop-28)
      && window.pageYOffset <= (this.refStory.current.offsetTop + this.refStory.current.clientHeight-28)
      )
    {
      this.focus('story');
    }else if (
      window.pageYOffset >= (this.refRisksAndChallenges.current.offsetTop-28)
      && window.pageYOffset <= (this.refRisksAndChallenges.current.offsetTop
      + this.refRisksAndChallenges.current.clientHeight-28)
      )
    {
      this.focus('risksAndChallenges')
    }else if(
      window.pageYOffset >= (this.refEnvironmentalCommitments.current.offsetTop-28)
      && window.pageYOffset <= (this.refEnvironmentalCommitments.current.offsetTop
      + this.refEnvironmentalCommitments.current.clientHeight-28)
      )
    {
      this.focus('environmentalCommitments')
    }
  }

  scrollToRef(ref){
    window.scrollTo({
      top: ref.current.offsetTop-28
    });
  }

  fetchStory(){
    axios({
      method: 'get',
      url: '/api/story/50',
    })
    .then((response)=>{
      this.setState({
      story: response.data
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  fetchRisksAndChallenges(){
    axios({
      method: 'get',
      url: '/api/RisksAndChallenges/2',
    })
    .then((response)=>{
      this.setState({
        risksAndChallenges: response.data
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  fetchEnvironmentalChallenges(){
    axios({
      method: 'get',
      url: '/api/EnvironmentalCommitments/1',
    })
    .then((response)=>{
      this.setState({
        environmentalCommitments: response.data
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  handleClickStory(e){
    e.preventDefault();
    this.scrollToRef(this.refStory);
  }

  handleClickRisksAndChallenges(e){
    e.preventDefault();
    this.scrollToRef(this.refRisksAndChallenges);
  }

  handleClickEnvironmentalCommitments(e){
    e.preventDefault();
    this.scrollToRef(this.refEnvironmentalCommitments);
  }

  render (){
    return (
      <Wrapper>
        <NavContainer>
          <Nav>
              <NavTitle><Link href="#" onClick={this.handleClickStory} ref={this.storyText}>Story</Link></NavTitle>
              <NavTitle><Link href="#" onClick={this.handleClickRisksAndChallenges} ref ={this.risksAndChallengesText}>Risks And Challenges</Link></NavTitle>
              <NavTitle><Link href="#" onClick={this.handleClickEnvironmentalCommitments} ref = {this.environmentalCommitmentsText} >Environmental Commitments</Link></NavTitle>
          </Nav>
        </NavContainer>
        <LeftMain>
          <RefDiv ref={this.refStory}>
          <Story data = {this.state.story}/>
          </RefDiv>
          <RefDiv div ref={this.refRisksAndChallenges}>
          <RisksAndChallenges data = {this.state.risksAndChallenges}/>
          </RefDiv>
          <div ref={this.refEnvironmentalCommitments}>
          <EnvironmentalCommitments data = {this.state.environmentalCommitments} />
          </div>
        </LeftMain>
      </Wrapper>
    )
  }
}

export default Campaign