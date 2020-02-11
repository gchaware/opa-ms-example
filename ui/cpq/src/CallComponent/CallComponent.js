import React from 'react';
import FormModal from './FormModal'

class CallComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSalesRole :false,
            isSalesSupportRole : false,
            isSalesAdminRole : false,
            offerList : [],
            currentJwt : "",
            title: "",
            customerid: "",
            segment: "",
            notes: "",
            offerResult: "",
            resultMessage: "",
            offerid: "",
            saveMode: 0,
            roleSelected: false
        }
    }
    
    getOffers(currentJwt) {
        var offerList = []
        if (currentJwt !== "") {
            fetch("/offers",{ headers: {"Authorization" : currentJwt}})
            .then(result => {
                let resultJson = result.json()
                return resultJson
            })
            .then(offers => {
                offerList = offers.map((offer) => {
                    return (
                        <div className="mt-2 pt-2 pb-2 offer-list border border-light bg-light">
                            <div className="inline"><b>{offer.offerid}</b> : {offer.title} </div>
                            <div className="inline right-aligned">
                                <button type="button" className="btn btn-raised btn-info" 
                                        onClick={this.handleEditClick(offer.offerid,offer.title,offer.customerid,offer.segment,offer.notes)} 
                                        data-toggle="modal" data-target="#OfferModal">Edit</button>
                                <button type="button" className="ml-3 btn btn-raised btn-info" 
                                        onClick={this.deleteOffer(offer.offerid)}>Delete</button>
                            </div>
                        </div>
                    )
                })
                this.setState({offerList})
            })
        } else {
            this.setState({offerList})
        }
    }

    changeRole = (event) => {
        var isSalesRole,isSalesSupportRole,currentJwt,isSalesAdminRole,roleSelected;
        if (event.target.value === "1")
        {
            isSalesRole = true;
            roleSelected = true;
            currentJwt = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMb2NhbEpXVElzc3VlciIsImlhdCI6MTU3MzcyNzM5MSwiZXhwIjo0MDk4MjQ1Mzc4LCJhdWQiOiJvcGEtZXhhbXBsZS5jb20iLCJzdWIiOiJzYWxlc0BleGFtcGxlLmNvbSIsIkdpdmVuTmFtdyI6IkpvaG5ueSIsIlN1cm5hbWUiOiJTYWxlcyIsIkVtYWlsIjoianNhbGVzQGV4YW1wbGUuY29tIiwiUm9sZSI6IlNhbGVzIn0.UbHWQpCMwupzsFp8f0CQ4o_bJSVaBugKijhcURZ_Mko"
        } else if (event.target.value === "2") {
            isSalesSupportRole = true;
            roleSelected = true;
            currentJwt = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMb2NhbEpXVElzc3VlciIsImlhdCI6MTU3MzcyNzM5MSwiZXhwIjo0MDk4MjQ1Mzc4LCJhdWQiOiJvcGEtZXhhbXBsZS5jb20iLCJzdWIiOiJzYWxlc0BleGFtcGxlLmNvbSIsIkdpdmVuTmFtdyI6IlJvbm55IiwiU3VybmFtZSI6IkRlcHAiLCJFbWFpbCI6InJkZXBwQGV4YW1wbGUuY29tIiwiUm9sZSI6IlNhbGVzIFN1cHBvcnQifQ.idRAEBhxDVSIaBIfY_Hg2qR9g919JfRMQVNojBdwAIY"
        } else if (event.target.value === "3") {
            isSalesAdminRole = true;
            roleSelected = true;
            currentJwt = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NzQ2NjM3MDAsImV4cCI6NDA5OTE4NTMwMCwiYXVkIjoib3BhLWV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjoiU2FsZXMgQWRtaW4ifQ._UtjZtowF3NNN3IF1t0LBHuzQhdfIfsO8jC-46GvbRM"
        }else {
            isSalesRole = false;
            isSalesSupportRole = false;
            isSalesAdminRole = false;
            roleSelected = false;
            currentJwt=""
        }
        this.getOffers(currentJwt);
        this.setState({isSalesRole, isSalesSupportRole,isSalesAdminRole,currentJwt,roleSelected,offerResult:""});
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
     }

     handleCustomerChange = (e) => {
        this.setState({customerid: e.target.value});
     }

     handleSegmentChange = (e) => {
        this.setState({segment: e.target.value});
     }

     handleNotesChange = (e) => {
        this.setState({notes: e.target.value});
     }

    saveOffer = (e) => {
        let currentJwt = this.state.currentJwt;
        let offerObject = {};
        offerObject.title=this.state.title;
        offerObject.customerid=this.state.customerid;
        offerObject.segment=this.state.segment;
        offerObject.notes=this.state.notes;
        let offerJson = JSON.stringify(offerObject)
        fetch('/offer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': currentJwt 
            },
            body: offerJson
        })
        .then( result => {
            this.setState({offerid:"",title:"",customerid:"",segment:"",notes:""})
            if (result.ok) {
                return result.json();
            } else if (result.status === 403) {
                this.setState({offerResult : "403"})
                return "";
            } else {
                this.setState({offerResult : "500"})
                return "";
            }
        })
        .then (json => {
            if (json !== "") {
                this.setState({offerResult : "ok",resultMessage:"Success!! Offer ID " + json.offerid + " created."})
            }
            //SaveMode=0 means Create.
            let saveMode = 0;
            this.setState({saveMode})
            this.getOffers(currentJwt);
        })
     }

     patchOffer = () => {
        let currentJwt = this.state.currentJwt;
        let offerObject = {};
        offerObject.offerid=this.state.offerid;
        offerObject.title=this.state.title;
        offerObject.customerid=this.state.customerid;
        offerObject.segment=this.state.segment;
        offerObject.notes=this.state.notes;
        let offerJson = JSON.stringify(offerObject)
        let offerURL='/offer/' + this.state.offerid;
        fetch(offerURL, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': currentJwt 
            },
            body: offerJson
        })
        .then( result => {
            this.setState({offerid:"",title:"",customerid:"",segment:"",notes:""})
            if (result.ok) {
                return result.json();
            } else if (result.status === 403) {
                this.setState({offerResult : "403"})
                return "";
            } else {
                this.setState({offerResult : "500"})
                return "";
            }
        })
        .then (json => {
            if (json !== "") {
                this.setState({offerResult : "ok",resultMessage:"Success!! Offer ID " + json.offerid + " updated."})
            }
            //SaveMode=0 means Create.
            let saveMode = 0;
            this.setState({saveMode})
            this.getOffers(currentJwt);
        })
     }

     deleteOffer = offerid => (e) => {
        let currentJwt = this.state.currentJwt;
        let offerURL='/offer/' + offerid;
        fetch(offerURL, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': currentJwt 
            },
        })
        .then( result => {
            //SaveMode=0 means Create.
            let saveMode = 0;
            this.setState({offerid:"",title:"",customerid:"",segment:"",notes:"",saveMode})
            if (result.ok) {
                this.setState({offerResult : "ok",resultMessage:"Success!! Offer ID " + offerid + " deleted."})
            } else if (result.status === 403) {
                this.setState({offerResult : "403"})
            } else {
                this.setState({offerResult : "500"})
            }
            this.getOffers(currentJwt);
        })
     }

     handleEditClick = (offerid,title,customerid,segment,notes) => (event) => {
        //SaveMode=1 means Edit.
        let saveMode = "1"
        this.setState({offerid,title,customerid,segment,notes,saveMode})
     }
     
    render()  {
        let resultStatement;
        if (this.state.offerResult === "ok") {
            resultStatement = <div className="alert-success pt-2 pl-2 mt-3 mb-3 border border-dark">{this.state.resultMessage}{this.state.offerId}</div> 
        } else if (this.state.offerResult === "403") {
            resultStatement = <div className="alert-danger pt-2 pl-2 mt-3 mb-3">Forbidden!! User is not authorised to perform this operation</div>
        } else if (this.state.offerResult === "500") {
            resultStatement = <div className="alert-danger pt-2 pl-2 mt-3 mb-3">Error!! Unexpected error occured</div>
        } else {
            resultStatement = ""
        }
        return (
            <>
        <div className="jumbotron">
            <div className="container">
                {this.state.newTitle}
                <h1 className="display-3">Hello, there!</h1>
                <p>This is a very simple webpage simulating the various API calls a user will make. To start experimenting, select the role you want to use first!!</p>
                <select className="browser-default custom-select" onChange = {this.changeRole}>
                    <option defaultValue value="0">Select Role</option>
                    <option value="1">Sales</option>
                    <option value="2">Sales Support</option>
                    <option value="3">Sales Admin</option>
                </select>
                {this.state.isSalesRole && <><div className="alert-info pt-2 pl-2 mt-3 border border-dark"><p><strong>Sales Role : </strong> 
                    Sales Role can get, create and edit offers. However, deleting an offer is not allowed.</p></div>
                    </>}
                {this.state.isSalesSupportRole && <><div className="alert-info pt-2 pl-2 mt-3 border border-dark"><p><strong>Sales Support Role : </strong> 
                Sales Support Role has read only access. People in this role can read (Get) an offer. However, creating / editing / deleting an offer is not allowed.</p></div>
                </>}
                {this.state.isSalesAdminRole && <><div className="alert-info pt-2 pl-2 mt-3 border border-dark"><p><strong>Sales Admin Role : </strong> 
                Sales Admin Role has read only access to all offers. People in this role can read (Get) an offer and Delete an offer. However, creating / editing an offer is not allowed.</p></div>
                </>}
            </div>
        </div>

        <div className="container">
        <div className="row">
          <div className="col-md-9">
            {resultStatement}
            <header>
                <h2 className="inline">Get Offers</h2>
                <div className="inline right-aligned"><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#OfferModal" disabled={!this.state.roleSelected}>Create Offer</button></div>
            </header>
            {this.state.offerList}
          </div>
        </div>
      </div>
    <FormModal title={this.state.title} customerid={this.state.customerid} segment={this.state.segment} notes={this.state.notes} handleTitleChange={this.handleTitleChange}
            handleCustomerChange={this.handleCustomerChange} handleSegmentChange={this.handleSegmentChange} handleNotesChange={this.handleNotesChange} saveOffer={this.saveOffer} 
            saveMode={this.state.saveMode} patchOffer={this.patchOffer}></FormModal>
      </>
        )
    }
}

export default CallComponent;
