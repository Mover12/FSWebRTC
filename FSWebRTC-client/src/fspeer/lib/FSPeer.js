class FSPeer {
    constructor(options) {
        this.peer = options.peer;
    }

    async open(uid, files) {
        if(files[0]) {
            let reader = new FileReader();

            reader.readAsText(files[0]);

            reader.onload = async () => {
                const message = JSON.parse(reader.result);

                if (message.event == 'offer') {
                    const answer = await this.peer.createAnswer(message.data.uid, message.data.sdp);
        
                    const a = document.createElement("a");
                    const answerFile = new Blob([JSON.stringify({
                        event: 'answer',
                        data: {
                            uid: this.peer.id,
                            sdp: answer
                        }
                    })], {type : 'text/sdp'});
                    const url = window.URL.createObjectURL(answerFile)
                    
                    a.href = url; 
                    a.download = "answer.sdp";
                    a.click();
            
                    window.URL.revokeObjectURL(url);
                } else if (message.event == 'answer') {
                    await this.peer.setAnswer(message.data.uid, message.data.sdp);
                }
            };
        } else {
            const offer = await this.peer.createOffer(uid);

            const a = document.createElement("a");
            const offerFile = new Blob([JSON.stringify({
                event: 'offer',
                data: {
                    uid: this.peer.id,
                    sdp: offer
                }
            })], {type : 'text/sdp'});
            const url = window.URL.createObjectURL(offerFile)
            
            a.href = url; 
            a.download = "offer.sdp";
            a.click();
        
            window.URL.revokeObjectURL(url);
        }
    }
}

export default FSPeer;