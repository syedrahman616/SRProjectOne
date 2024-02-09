import React from "react";
import PlumberSidebar from "./plumbersidebar";
import PlumberNavbar from "./plumbernavbar";
function PlumberDashboard() {
  return (
    <>
      <PlumberNavbar />
      <div
        className="container-fluid"
        style={{
          backgroundColor: "rgb(248, 248, 248)",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="row dash_row">
          <div className="col-3 col_corr_2">
            <PlumberSidebar />
          </div>
          <div className="col-9 col_corr_1">
            <div className="row mt-3">
              <div className="col-12 col-md-3">
                <div className="card">
                  <div className="cardhalf">
                    <div className="css ml-2">
                      <i className="fa fa-book"></i>
                    </div>
                    <div>
                      <p className="cardp">Total Jobs</p>
                      <p className="cardp1">281</p>
                    </div>
                  </div>
                  <hr className="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root"></hr>
                  <div className="MuiBox-root css-bln954">
                    <p className="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root">
                      <span className="MuiTypography-root MuiTypography-button css-15ti2lr-MuiTypography-root">
                        +55%
                      </span>
                      &nbsp;than lask week
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card">
                  <div className="cardhalf">
                    <div className="css-1 ml-2">
                      <i className="fa fa-user-plus"></i>
                    </div>
                    <div>
                      <p className="cardp">Finished Jobs</p>
                      <p className="cardp1">281+</p>
                    </div>
                  </div>
                  <hr className="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root"></hr>
                  <div className="MuiBox-root css-bln954">
                    <p className="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root">
                      <span className="MuiTypography-root MuiTypography-button css-15ti2lr-MuiTypography-root">
                        +55%
                      </span>
                      &nbsp;than yesterday
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card">
                  <div className="cardhalf">
                    <div className="css-2 ml-2">
                      <i className="fa fa-book"></i>
                    </div>
                    <div>
                      <p className="cardp">Revenue</p>
                      <p className="cardp1">281k</p>
                    </div>
                  </div>
                  <hr className="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root"></hr>
                  <div className="MuiBox-root css-bln954">
                    <p className="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root">
                      <span className="MuiTypography-root MuiTypography-button css-15ti2lr-MuiTypography-root">
                        +55%
                      </span>
                      &nbsp;than last month
                    </p>
                  </div>
                </div>
              </div>
            <div className="col-12 col-md-3">
                <div className="card">
                  <div className="cardhalf">
                    <div className="css-3 ml-2">
                      <span className="fa fa-book" />
                    </div>
                    <div>
                      <p className="cardp">Followers</p>
                      <p className="cardp1">+91</p>
                    </div>
                  </div>
                  <hr className="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root"></hr>
                  <div className="MuiBox-root css-bln954">
                    <p className="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root">
                      Just updated
                    </p>
                  </div>
                  {/* <div className="MuiBox-root css-bln954"><p class="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root"><span className="MuiTypography-root MuiTypography-button css-15ti2lr-MuiTypography-root">+55%</span>&nbsp;than lask week</p></div> */}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
export default PlumberDashboard;