const EnquiryCustom = (props) => {
  return (
    <div className="row">
      {props.image && (
        <div className="col-lg-3">
          <img src={props.image} alt="fabric" className="newimg" />
        </div>
      )}
      <div className="col-lg-9">
        <ul className="list-group list-group-flush">
          {props.type && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Type :</span>
              <strong>{props.type}</strong>
            </li>
          )}

          {props.required && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">required :</strong>
              <span>{props.required}</span>
            </li>
          )}
          {props.rodRingRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Curtain rod ring required :</span>
              <strong>{props.rodRingRequired}</strong>
            </li>
          )}
          {props.rodRingQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">no of curtain rod ring :</span>
              <strong>{props.rodRingQuantity}</strong>
            </li>
          )}
          {props.borderType && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">border type:</span>
              <strong>{props.borderType}</strong>
            </li>
          )}
          {props.fabricName && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Fabric Name :</span>
              <strong>{props.fabricName}</strong>
            </li>
          )}
          {props.brandName && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">brand Name :</span>
              <strong> {props.brandName}</strong>
            </li>
          )}
          {props.length && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">length. :</strong>
              <span>{props.length}</span>
            </li>
          )}
          {props.width && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Width. :</span>
              <strong> {props.width}</strong>
            </li>
          )}
          {props.finalQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">final quantity :</span>
              <strong>{props.finalQuantity}</strong>
            </li>
          )}
          {props.tieKnobQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">tie knobs pair :</span>
              <strong>{props.tieKnobQuantity}</strong>
            </li>
          )}
          {props.screwSizeRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">screw size required :</strong>
              <span>{props.screwSizeRequired}</span>
            </li>
          )}
          {props.height && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">drop/Height :</span>
              <strong>{props.height}</strong>
            </li>
          )}

          {props.lBracketsRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">L Brackets required :</span>
              <strong>{props.lBracketsRequired}</strong>
            </li>
          )}
          {props.totalFabric && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">total fabric required :</span>
              <strong>{props.totalFabric}</strong>
            </li>
          )}
          {props.lBracketsQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Number of L Brackets :</span>
              <strong>{props.lBracketsQuantity}</strong>
            </li>
          )}

          {props.turning && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Turning :</span>
              <strong>{props.turning}</strong>
            </li>
          )}
          {props.repeatHorizontal && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Repeat Horizontal :</span>
              <strong> {props.repeatHorizontal}</strong>
            </li>
          )}
          {props.repeatVertical && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Repeat vertical :</span>
              <strong> {props.repeatVertical}</strong>
            </li>
          )}
          {props.extraBracketSupportRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">extra bracket support required :</span>
              <strong>{props.extraBracketSupportRequired}</strong>
            </li>
          )}
          {props.extraBracketSupportQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">extra bracket support quantity :</span>
              <strong>{props.extraBracketSupportQuantity}</strong>
            </li>
          )}
          {props.book && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">book:</span>
              <strong>{props.book}</strong>
            </li>
          )}
          {props.track && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">Curtain track :</strong>
              <span>{props.track}</span>
            </li>
          )}
          {props.motorOperation && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">Track Motor operation :</strong>
              <span>{props.motorOperation}</span>
            </li>
          )}
          {props.style || props.note ? (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              {props.style && (
                <div>
                  <span className="mb-0">Style :</span>
                  <strong>{props.style}</strong>
                </div>
              )}
              {props.note && (
                <span className="d-block">Note: {props.note}</span>
              )}
            </li>
          ) : (
            ""
          )}
          {props.extraBracketRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">extra bracket Required :</strong>
              <span>{props.extraBracketRequired}</span>
            </li>
          )}
          {props.gathering && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">gathering:</span>
              <strong>{props.gathering}</strong>
            </li>
          )}
          {props.handHammering && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">hand hammering :</span>
              <strong>{props.handHammering}</strong>
            </li>
          )}
          {props.leadChain && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Lead Chain :</span>
              <strong>{props.leadChain}</strong>
            </li>
          )}
          {props.motorType && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">track motor type:</strong>
              <span>{props.motorType}</span>
            </li>
          )}
          {props.extraBracketQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">extra bracket Quantity :</strong>
              <span>{props.extraBracketQuantity}</span>
            </li>
          )}
          {props.overlapperRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">over lapper required :</strong>
              <span>{props.overlapperRequired}</span>
            </li>
          )}
          {props.overlapperQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">track over lapper :</strong>
              <span>{props.overlapperQuantity}</span>
            </li>
          )}
          {props.tieKnobRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0">tie Knobs Required :</strong>
              <span>{props.tieKnobRequired}</span>
            </li>
          )}
          {props.trackStickRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <strong className="mb-0"> Stick Required :</strong>
              <span>{props.trackStickRequired}</span>
            </li>
          )}
          {props.stickQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">No of stick Pair :</span>
              <strong>{props.stickQuantity}</strong>
            </li>
          )}
          {props.endCapRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">end cap required :</span>
              <strong>{props.endCapRequired}</strong>
            </li>
          )}
          {props.endCapQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">end cap Quantity:</span>
              <strong>{props.endCapQuantity}</strong>
            </li>
          )}
          {props.endCapWallSupportRequired && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">end cap wall support required :</span>
              <strong>{props.endCapWallSupportRequired}</strong>
            </li>
          )}
          {props.endCapWallSupportQuantity && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">end cap wall support quantity :</span>
              <strong>{props.endCapWallSupportQuantity}</strong>
            </li>
          )}
          {props.channelType && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">channel type :</span>
              <strong>{props.channelType}</strong>
            </li>
          )}
          {props.panel && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Number of panel :</span>
              <strong>{props.panel}</strong>
            </li>
          )}
          {props.curtainRodType && (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">Curtain rod Type :</span>
              <strong>{props.curtainRodType}</strong>
            </li>
          )}
          {props.customType || props.customImage ? (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">type :</span>
              {props.customType && <strong>{props.customType}</strong>}
              {props.customImage && (
                <div>
                  <img
                    src={props.customImage}
                    alt="fabric"
                    className="newimg"
                  />
                </div>
              )}
            </li>
          ) : (
            ""
          )}
          {props.material1 || props.material2 ? (
            <li className="list-group-item d-flex justify-content-between border-0 py-1">
              <span className="mb-0">images :</span>
              {props.material1 && (
                <div>
                  <img src={props.material1} alt="fabric" className="newimg" />
                </div>
              )}
              {props.material2 && (
                <div>
                  <img src={props.material2} alt="fabric" className="newimg" />
                </div>
              )}
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};
export default EnquiryCustom;
