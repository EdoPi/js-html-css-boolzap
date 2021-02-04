var app = new Vue({
  el: '#root',
  data: {
    isActive:false,
    searchText:'',
    chatText:'',
    activeConv:0,
    contacts: [
    	{
    		name: 'Michele',
    		avatar: '_1',
    		visible: true,
    		messages: [
    			{
    				date: '10/01/2020 15:30:55',
    				text: 'Hai portato a spasso il cane?',
    				status: 'sent'
    			},
    			{
    				date: '10/01/2020 15:50:00',
    				text: 'Ricordati di dargli da mangiare',
    				status: 'sent'
    			},
    			{
    				date: '10/01/2020 16:15:22',
    				text: 'Tutto fatto!',
    				status: 'received'
    			}
    		],
    	},
    	{
    		name: 'Fabio',
    		avatar: '_2',
    		visible: true,
    		messages: [
    			{
    				date: '20/03/2020 16:30:00',
    				text: 'Ciao come stai?',
    				status: 'sent'
    			},
    			{
    				date: '20/03/2020 16:30:55',
    				text: 'Bene grazie! Stasera ci vediamo?',
    				status: 'received'
    			},
    			{
    				date: '20/03/2020 16:35:00',
    				text: 'Mi piacerebbe ma devo andare a fare la spesa.',
    				status: 'sent'
    			}
    		],
    	},
    	{
    		name: 'Samuele',
    		avatar: '_3',
    		visible: true,
    		messages: [
    			{
    				date: '28/03/2020 10:10:40',
    				text: 'La Marianna va in campagna',
    				status: 'received'
    			},
    			{
    				date: '28/03/2020 10:20:10',
    				text: 'Sicuro di non aver sbagliato chat?',
    				status: 'sent'
    			},
    			{
    				date: '28/03/2020 16:15:22',
    				text: 'Ah scusa!',
    				status: 'received'
    			}
    		],
    	},
    	{
    		name: 'Luisa',
    		avatar: '_4',
    		visible: true,
    		messages: [
    			{
    				date: '10/01/2020 15:30:55',
    				text: 'Lo sai che ha aperto una nuova pizzeria?',
    				status: 'sent'
    			},
    			{
    				date: '10/01/2020 15:50:00',
    				text: 'Si, ma preferirei andare al cinema',
    				status: 'received'
    			}
    		],
    	},
    ],
  },

  methods:{
    whichConv: function(indexContacts){
        return  this.activeConv =  indexContacts;
    }, // end whichConv

    sentReceived: function(element){
      if (element.status === 'sent') {
          return 'green-chat'
      }
      return 'white-chat'
    }, // end sentReceived

    myNewMessage: function (){
      this.contacts[this.activeConv].messages.push({
        date: this.dateGenerator(),
        text: this.chatText,
        status: 'sent',
      });
        let that = this;
        setTimeout(function () {
          that.contacts[that.activeConv].messages.push({
            date:that.dateGenerator(),
            text: 'ok',
            status: 'received',
          });
        }, 1000);
    }, // end myNewMessage function

    searchEngine: function(){
      this.contacts.forEach((item, i) => {
        const nameLower = item.name.toLowerCase();
        const searchLower = this.searchText.toLowerCase();
        item.visible = nameLower.startsWith(searchLower);
      });
    },// end searchEngine

    dateGenerator: function(){
      const actualDate = dayjs().format('DD-MM-YYYY HH:mm:ss');
      return actualDate;
    }, //end dateGenerator

    lastAccess: function (index) {
      const message = this.contacts[index].messages
      const receivedFiltered = message.filter((element) => {
        return element.status === 'received';
      });
      const lastOne = receivedFiltered.length - 1;
      const lastDate = receivedFiltered[lastOne].date;
      return lastDate;
    }, // end lastAccess

    onlyTime: function (indexConv, indexMess) {
      const date = this.contacts[indexConv].messages[indexMess].date;
      const arrayDate = date.split(" ");
      const time = arrayDate[arrayDate.length -1] ;
      return time;
    },

    

    toggleOptions: function(){
        if (this.isActive) {
          return 'active-message'
        }
        return ''
    }, //end toggleOptions



  }

});

Vue.config.devtools = true;

/*
const element = document.getElementById("options").getElementsByTagName("div")[index].getElementByClassName("message-options")[0];
element.classList.toggle("active");
*/
