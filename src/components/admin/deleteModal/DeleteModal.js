import React from "react";
import PropTypes from "prop-types";

const DeleteModal = ({ title, confirmDeletion }) => (
  <div className="modal fade" id="confirmDel">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="mealModalLabel">
            Confirm Deletion
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to remove this {title}.</p>
        </div>
        <div className="modal-footer">
          <button
            id="btn-no"
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            No
          </button>
          <button
            onClick={confirmDeletion}
            type="button"
            className="btn-del btn btn-primary"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
);

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  confirmDeletion: PropTypes.func.isRequired
};

export default DeleteModal;
