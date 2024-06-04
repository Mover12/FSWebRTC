class FilePeer {
    constructor(options) {
        this.id = options.id;

        this.peer = options.peer;
    }

    async open(id, files) {
        if(files[0]) {
            let reader = new FileReader();

            reader.readAsText(files[0]);

            reader.onload = async () => {
                const data = JSON.parse(reader.result);

                if (data.sdp.type == 'offer') {
                    const answer = await this.peer.createAnswer(data.id, data.sdp);
        
                    const a = document.createElement("a");
                    const sdpFile = new Blob([JSON.stringify({
                        id: this.id,
                        sdp: answer
                    })], {type : 'text/sdp'});
                    const url = window.URL.createObjectURL(sdpFile)
                    
                    a.href = url; 
                    a.download = "answer.sdp";
                    a.click();
            
                    window.URL.revokeObjectURL(url);
                } else if (data.sdp.type == 'answer') {
                    await this.peer.setAnswer(data.id, data.sdp);
                }
            };
        } else {
            const offer = await this.peer.createOffer(id);

            const a = document.createElement("a");
            const sdpFile = new Blob([JSON.stringify({
                id: id,
                sdp: offer
            })], {type : 'text/sdp'});
            const url = window.URL.createObjectURL(sdpFile)
            
            a.href = url; 
            a.download = "offer.sdp";
            a.click();
        
            window.URL.revokeObjectURL(url);
        }
    }
}

export default FilePeer;