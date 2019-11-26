import React from 'react'
class FormModal extends React.Component {
    
    render()  {
            return (
            <>
                <div className="modal fade" id="OfferModal" tabIndex="-1" role="dialog" aria-labelledby="offerModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create / Edit Offer</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>   
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    Title
                                    <input type="text" className="form-control is-filled" id="title" value = {this.props.title} onChange={this.props.handleTitleChange}></input>
                                </div>
                                <div className="form-group">
                                    CustomerId
                                    <input type="text" className="form-control is-filled" id="customerid" value = {this.props.customerid} onChange={this.props.handleCustomerChange}></input>
                                </div>
                                <div className="form-group">
                                    Segment
                                    <input type="text" className="form-control is-filled" id="segment" value = {this.props.segment} onChange={this.props.handleSegmentChange}></input>
                                </div>
                                <div className="form-group">
                                    Notes
                                    <input type="textarea" className="form-control is-filled" id="notes" value = {this.props.notes} onChange={this.props.handleNotesChange}></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {this.props.saveMode===0? this.props.saveOffer:this.props.patchOffer}>Save changes</button>
                        </div>
                    </div>
                </div>
                </div>
            </>
            )
        } 
}

export default FormModal