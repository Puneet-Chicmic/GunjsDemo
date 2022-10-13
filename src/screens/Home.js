import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text,TouchableOpacity,SafeAreaView} from "react-native";
import { Typo } from "../components/Typo";
import { FilledButton } from "../components/Button";
import { useAuth, useAuthDispatch, logoutUser } from "../contexts";
import useGun from "../hooks/useGun";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import { RFValue } from "react-native-responsive-fontsize";
export default function Home() {
	const profile = useAuth();
	const dispatch = useAuthDispatch(); 
	const { user, SEA,gun } = useGun()

	const [messages, setMessages] = useState([]);
	useEffect(()=>{
		gun
		.get('messages8')
		.map()
		.on((a,_,message,event) => {
		console.log(a,"gun1233332222===>>>>>>>");
		setMessages(prev=>{
			const temp=prev.findIndex((item)=>item._id===a._id)

			return temp===-1?[{_id:a._id,text:a.text,userId:a.userId},...prev]:prev})
		})
	},[])

	// useEffect(() => {
	//   setMessages([
	// 	{
	// 	  _id: profile.username,
	// 	  text: 'Hello developer',
	// 	  createdAt: new Date(),
	// 	  user: {
	// 		_id: 2,
	// 		name: 'React Native',
	// 		avatar: 'https://placeimg.com/140/140/any',
	// 	  },
	// 	},
	//   ])
	// }, [])
	const onSend = (messages)=>{
		console.log(messages[0],"messages=======>");
		gun.get('messages8').set({
			_id: messages[0]._id,
			text: messages[0].text,
			userId: profile.username,
		  },(res)=>{
			  console.log(res,"RES====>>>>>");
		  })
		//   setMessages(prev=>{
		// 	//   console.log(prev,messages,"HELLL NOOO");
		// 	return [...messages,...prev]})
	}

	const renderInputToolbar = props => {
		return (
		  <View style={styles.inputToolbarView}>
			<InputToolbar
			  {...props}
			  containerStyle={styles.inputToolbar}
			//   renderComposer={renderComposer}
			  renderSend={renderSend}
			//   renderActions={renderAction}
			/>
		  </View>
		)
	  }
	  const renderSend = props => {
		return (
		  <View style={styles.smileView}>
			<Send
			  {...props}
			  containerStyle={styles.sendCtr}
			>
			 <Text>Send</Text>
			</Send>
		  </View>
		)
	  }
	  const renderBubble =({currentMessage})=> {
		return (
			<>
			<View
			style={[
			  styles.modalViewContainer,
			  {
				flexDirection: currentMessage.userId === profile.username ? 'row-reverse' : 'row',
			  },
			]}
		  >
			  <View
            style={[
              styles.commonMessage,
              currentMessage.userId === profile.username ? styles.right : styles.left,
            ]}
          >
			 <Text
                selectable
                style={currentMessage.userId === profile.username ? styles.rightText : styles.leftText}
              >
                {currentMessage.text}
              </Text>
			  </View>
		  </View>
		  <View
		  style={
			currentMessage.userId === profile.username
			  ? styles.timeCtr
			  : [styles.timeCtr, { left:'2.3%' }]
		  }
		>
			<Text style={styles.username}>{currentMessage.userId}</Text>
		
		</View>
		</>
		)
	  }
	return (
		<SafeAreaView style={{width:"100%",height:"100%"}}>
			<View style={{flexDirection:"row",width:'100%',alignItems:"center",justifyContent:"space-between"}}>
			<Typo size="lg" weight="bold">
				Welcome, {profile.username}
			</Typo>
			<TouchableOpacity
						style={{width:150,height:50,backgroundColor:"grey",borderRadius:8,
						alignItems:"center",justifyContent:"center"}}
						onPress={() => logoutUser(dispatch)}
						>

							<Text>Logout</Text>
						</TouchableOpacity>
			</View>

		<GiftedChat
          renderInputToolbar={renderInputToolbar}
          keyboardShouldPersistTaps={'handled'}
          renderBubble={renderBubble}
        //   user={{
        //     _id: userId,
        //   }}
		messages={messages}
		onSend={onSend}
		user={{
		  _id: profile.username,
		}}
		renderAvatar={() => null}
        />

		</SafeAreaView>
	);
}

const styles=StyleSheet.create({
	commonMessage: {
		maxWidth: '70%',
		paddingVertical: '3%',
		paddingHorizontal: '2%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		alignItems: 'center',
	  },
	inputToolbar: {
		marginTop: 5,
		borderTopWidth: 0,
		bottom: Platform.OS==="ios"?35:15,
		position:'absolute',
		width: '90%',
		alignSelf: 'center',
		backgroundColor: '#ffffff',
		maxHeight: RFValue(100),
		marginHorizontal: 20,
		borderRadius: 15,
		paddingLeft: '1%',
		alignItems: 'center',
		justifyContent: 'center',
		// height:40
		minHeight: RFValue(41),
	  },
	  inputToolbarView:Platform.OS == 'ios'
  ? { bottom: -RFValue(70), width: '100%' }
  : { width: '100%', position: 'absolute', bottom: -RFValue(10) },

  smileView:{
    flexDirection: 'row',
    position: 'absolute',
    right: -7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sendCtr: {
    alignSelf: 'center',
    justifyContent: 'center',
    // right: -20,
  },
  modalViewContainer: {
    alignSelf: 'center',
    width: '94%',
    marginBottom: RFValue(20),
    // padding: 2,
  },
  right: {
    borderBottomLeftRadius: 10,
    backgroundColor: '#E1D8C3',
    borderBottomRightRadius: 0,
    minWidth: '23%',
  },
  left: {
    borderBottomRightRadius: 10,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 0,
    minWidth: '16%',
  },
  rightText: {
    color: '#212529',
    paddingHorizontal: '6%',
    fontSize: RFValue(16),
	borderRadius:6
  },
  leftText: {
    paddingHorizontal: '1%',
    color: '#212529',
    fontSize: RFValue(16),
	backgroundColor:"#ffffff",
	borderRadius:6
  },timeCtr: {
    position: 'absolute',
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    bottom: -3,
    paddingVertical: 2,
  },username: {
    fontSize: RFValue(15),
    paddingHorizontal: RFValue(5),
    color: 'grey',
	fontWeight:"600"
  },
})