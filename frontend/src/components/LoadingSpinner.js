import React from "react";

function LoadingSpinner(props) {
  return (
    <div className="loading-circle">
      <div className="col">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle" />
            </div>
            <div class="gap-patch">
              <div class="circle" />
            </div>
            <div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default LoadingSpinner;
