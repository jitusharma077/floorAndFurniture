import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Loader from "../../Common/Loader";

function ViewEstimate() {
  const location = useLocation();
  const type = location.state.EnquiryDetials;
  console.log("typeee", type);
  const [getAllEstimateData, setAllEstimateData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [EnquiryDetials, getEnquiryDetials] = useState([]);
  const [rooms, setRooms] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    GetDataWithToken("sales/get-estimate/117").then((response) => {
      if (response.status === true) {
        console.log("rtessssss", response.data);
        setAllEstimateData(response.data);
        setLoading(false);
        getEnquiryDetials(type);
        // console.log("resssss", response.data);
        setRooms(response.data);
      }
    });
  }, [""]);
  const renderTotalRoomAmount = (amount, colspan = 14) => {
    if (!amount) {
      return ``;
    }
    return (
      <tr>
        <th colSpan={14 / 2 + 1}>Total amount</th>
        <th colSpan={Math.round(14 / 2)}>{amount}</th>
      </tr>
    );
  };
  const getMaterialFormate = ({
    title,
    value,
    type,
    noOfPanel,
    stitchingPrice,
    stitchingCost,
    totalFabricInM,
    totalPrice,
    dis,
    tax,
    grandTotal,
    totalTax,
    unit,
    mrp,
    totalDiscount,
    curtainStyle,
    widthInFeet,
    qty,
    fittingCharge,
    hardwareSqmt,
  }) => {
    return {
      title,
      value,
      type,
      noOfPanel,
      stitchingPrice,
      stitchingCost,
      totalFabricInM,
      totalPrice,
      dis,
      tax,
      grandTotal,
      totalTax,
      unit,
      mrp,
      totalDiscount,
      curtainStyle,
      widthInFeet,
      qty,
      fittingCharge,
      hardwareSqmt,
    };
  };
  const getPriceFormate = (price) => {
    if (price) {
      return parseFloat(price).toFixed(1);
    }
    return price;
  };
  const getTotalFabric = (total) => {
    if (total) {
      return parseFloat(total).toFixed(2);
    }
    return total;
  };
  const renderStitchingCost = (window, colspan = 16) => {
    const stitching = window?.stitchingList ?? [];

    const totalAmount = stitching?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (stitching?.length == 0) {
      return "";
    }

    return (
      <>
        <tr>
          <th colSpan="16">Fabric stitching details</th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan="3">Item</th>
          <th colSpan="3">Curtain style</th>
          <th>No of panel / Width in ft</th>
          <th>Stitching price including taxes</th>
          <th>Weight price including taxes / Fitting charge</th>
          <th>Hand hamming price including taxes</th>
          <th>Lead chain price including taxes</th>
          <th>Gross amount</th>
          <th>Dis</th>
          <th>Net amount including taxes</th>
        </tr>
        {stitching?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td colSpan="3">{item?.title}</td>
              <td colSpan="3">{item?.curtainStyle}</td>
              <td>{item?.noOfPanel}</td>
              <td>{item?.stitchingPrice}</td>
              <td>{item?.weightPrice}</td>
              <td>{item?.handHammingPrice}</td>
              <td>{item?.leadChainPrice}</td>
              <td>{item?.totalPrice}</td>
              <td>{item?.totalDiscount}</td>
              <td>{item?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };
  const renderRoomHardware = (
    window = {},
    windowIndex,
    tax = 0,
    colspan = 16
  ) => {
    const hardwareList = window?.hardwareList ?? [];

    const totalAmount = hardwareList?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (hardwareList.length == 0) {
      return ``;
    }
    return (
      <>
        <tr>
          <th colSpan="16">Curtain Hardware details</th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan={3}>Item</th>
          <th colSpan={4}>Item name</th>
          <th>Width</th>
          <th>Qty</th>
          <th>MRP including taxes</th>
          <th>Fitting charge</th>
          <th>Gross amount</th>
          <th>Dis</th>
          <th>Net amount including taxes</th>
        </tr>
        {hardwareList?.map((item, index) => {
          return (
            <>
              <tr>
                <td>{index + 1}</td>
                <td colSpan={3}>{item?.title}</td>
                <td colSpan={4}>{item?.value}</td>
                <td>
                  {item?.widthInFeet && +item?.widthInFeet > 0
                    ? item?.widthInFeet + " ft"
                    : ""}
                </td>
                <td>{item?.qty ? item?.qty : ""}</td>
                <td>{item?.mrp ? item?.mrp : item?.hardwareSqmt}</td>
                <td>{item?.fittingCharge}</td>
                <td>{item?.totalPrice}</td>
                <td>{item?.dis}%</td>
                <td>{item?.grandTotal}</td>
              </tr>
            </>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const renderRoomBlind = (window = {}, windowIndex, tax = 0, colspan = 16) => {
    const blind = window?.blind ?? "";
    const blindList = blind?.blindList ?? [];

    const totalAmount = blindList?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    //Helper.log("blindList", blindList)
    if (blindList.length == 0) {
      return ``;
    }

    return (
      <>
        <tr>
          <th colspan={colspan}>Blind details</th>
        </tr>
        <tr>
          <th colspan={colspan / 2}>Width - ${blind?.width} cm</th>
          <th colspan={Math.round(colspan / 2)}>
            height / Drop - {blind?.height} cm
          </th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colspan="1">Item</th>
          <th colspan="4">Item name</th>
          <th>Qty</th>

          <th>No of panel</th>
          <th>Total Quantity</th>
          <th>Fabric MRP per SQMT</th>
          <th>Fitting charge</th>
          <th>Hardware Per RFT including taxes</th>

          <th>Gross amount</th>
          <th>Dis </th>
          <th>Net amount including taxes</th>
        </tr>
        {blindList?.map((fabric, fabricIndex) => {
          return (
            <tr>
              <td>{fabricIndex + 1}</td>
              <td colSpan={1}>{fabric?.title}</td>
              <td colSpan={4}>{fabric?.value}</td>
              <td>{fabric?.qty}</td>
              <td>{fabric?.noOfPanel}</td>
              <td>{fabric?.totalFabricInM}</td>
              <td>{fabric?.mrp}</td>
              <td>{fabric?.fittingCharge}</td>
              <td>{fabric?.hardwareSqmt}</td>
              <td>{fabric?.totalPrice}</td>
              <td>{fabric?.totalDiscount}</td>
              <td>{fabric?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const renderBlindStitchingCost = (window, colspan = 16) => {
    const blind = window?.blind ?? "";
    const stitching = blind?.blindStitchingList ?? [];

    const totalAmount = stitching?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (stitching?.length == 0) {
      return "";
    }

    return (
      <>
        <tr>
          <th colSpan={16}>Blind stitching details</th>
        </tr>
        <tr>
          <th colSpan={8}>Width - {blind?.width} cm</th>
          <th colSpan={8}>height / Drop - {blind?.height} cm</th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan={4}>Item</th>
          <th colSpan={3}>No of panel</th>
          <th colSpan={2}>Stitching price Per SQMT including taxes</th>
          <th colSpan={2}>Gross amount</th>
          <th>Dis</th>
          <th colSpan={2}>Net amount including taxes</th>
        </tr>
        {stitching?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td colSpan={4}>{item?.title}</td>
              <td colSpan={3}>{item?.noOfPanel}</td>
              <td colSpan={2}>{item?.stitchingPrice}</td>
              <td colSpan={2}>{item?.totalPrice}</td>
              <td>{item?.totalDiscount}</td>
              <td colSpan={2}>{item?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, 16)}
      </>
    );
  };

  const renderBlindHardware = (
    window = {},
    windowIndex,
    tax = 0,
    colspan = 16
  ) => {
    const blind = window?.blind ?? "";
    const blindList = blind?.blindHardwareList ?? [];

    const totalAmount = blindList?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (blindList.length == 0) {
      return ``;
    }

    return (
      <>
        <tr>
          <th colSpan={16}>Blind Hardware details</th>
        </tr>
        <tr>
          <th colSpan={Math.round(16 / 2)}>Width - ${blind?.width} cm</th>
          <th colSpan={Math.round(16 / 2)}>
            height / Drop - ${blind?.height} cm
          </th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan={3}>Item</th>
          <th colSpan={3}>Item name</th>
          <th>Qty</th>
          <th>Total Quantity</th>
          <th>Fabric MRP per meter</th>
          <th>Fitting charge</th>
          <th>Hardware Per RFT including taxes</th>

          <th>Gross amount</th>
          <th>Dis </th>
          <th>Net amount including taxes</th>
        </tr>
        {blindList?.map((fabric, fabricIndex) => {
          return (
            <tr>
              <td>{fabricIndex + 1}</td>
              <td colSpan={3}>{fabric?.title}</td>
              <td colSpan={3}>{fabric?.value}</td>
              <td>{fabric?.qty}</td>
              <td>{fabric?.totalFabricInM}</td>
              <td>{fabric?.mrp}</td>
              <td>{fabric?.fittingCharge}</td>
              <td>{fabric?.hardwareSqmt}</td>
              <td>{fabric?.totalPrice}</td>
              <td>{fabric?.totalDiscount}</td>
              <td>{fabric?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const renderRoomCurtain = (
    window = {},
    windowIndex,
    tax = 0,
    colspan = 16
  ) => {
    const fabrics = window?.fabricList ?? [];

    const totalAmount = fabrics?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    console.log("fabriccc length", fabrics.length);

    if (fabrics.length === 0) return "";
    return (
      <>
        <tr>
          <th colSpan={colspan}>Window - {windowIndex + 1} </th>
        </tr>
        <tr>
          <th colSpan={16 / 2}>Width - {window?.width} cm</th>
          <th colSpan={16 / 2}>Height / Drop - {window?.height} cm</th>
        </tr>
        {fabrics?.map((fabric, fabricIndex) => {
          return (
            <>
              {fabricIndex === 0 ? (
                <tr>
                  <th>Sno</th>
                  <th>Item</th>
                  <th colSpan="4">Item name</th>
                  <th colSpan="3">Curtain style</th>

                  <th>No of panel</th>
                  <th>Total Quantity</th>
                  <th>MRP per meter including taxes</th>

                  <th>Gross amount</th>
                  <th>Dis</th>
                  <th>Net amount including taxes</th>
                </tr>
              ) : (
                ``
              )}
              <tr>
                <td>{fabricIndex + 1}</td>
                <td>{fabric?.title}</td>
                <td colSpan="4">{fabric?.value}</td>
                <td colSpan="3">{fabric?.curtainStyle}</td>
                <td>{fabric?.noOfPanel}</td>
                <td>{fabric?.totalFabricInM}</td>
                <td>{fabric?.mrp}</td>

                <td>{fabric?.totalPrice}</td>
                <td>{fabric?.totalDiscount}</td>
                <td>{fabric?.grandTotal}</td>
              </tr>
            </>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const getTotalWindowPrice = (room) => {
    //Helper.log("Room=====>>>>>>>", room);
    const fabrics = room?.fabricList ?? [];
    const hardware = room?.hardwareList ?? [];
    const blinds = room?.blind?.blindList ?? [];
    const blindHardwareList = room?.blind?.blindHardwareList ?? [];
    const blindStitchingList = room?.blind?.blindStitchingList ?? [];
    const stitchingList = room?.stitchingList ?? [];

    let fabricPrice = 0;
    let hardwarePrice = 0;
    let blindPrice = 0;
    let blindHardwarePrice = 0;
    let blindStitchingPrice = 0;
    let curtainStitchingPrice = 0;

    fabrics?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        fabricPrice = parseFloat(fabricPrice) + parseFloat(item?.grandTotal);
      }
    });

    hardware?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        hardwarePrice =
          parseFloat(hardwarePrice) + parseFloat(item?.grandTotal);
      }
    });

    blinds?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        blindPrice = parseFloat(blindPrice) + parseFloat(item?.grandTotal);
      }
    });

    blindHardwareList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        blindHardwarePrice =
          parseFloat(blindHardwarePrice) + parseFloat(item?.grandTotal);
      }
    });

    blindStitchingList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        blindStitchingPrice =
          parseFloat(blindStitchingPrice) + parseFloat(item?.grandTotal);
      }
    });

    stitchingList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        curtainStitchingPrice =
          parseFloat(curtainStitchingPrice) + parseFloat(item?.grandTotal);
      }
    });

    return getPriceFormate(
      +fabricPrice +
        +hardwarePrice +
        +blindPrice +
        +blindHardwarePrice +
        +blindStitchingPrice +
        +curtainStitchingPrice
    );
  };
  const getLadder = () => {
    const obj = {
      name: "",
      price: 0,
      message: "",
    };
    const ladderCharge = 1000;
    if (rooms && rooms?.length > 0) {
      const roomDetails = rooms[0]?.roomInfo;
      const asset =
        roomDetails?.room_assets && roomDetails?.room_assets?.length > 0
          ? roomDetails?.room_assets[0]
          : "";
      if (asset && asset?.ladder) {
        obj["name"] = asset?.ladder?.ladder;
        obj["message"] = asset?.ladder?.note;
        obj["price"] = ladderCharge;
      }
    }
    return obj;
  };

  const getQty = (qty) => {
    if (
      ["null", "NAN", "NaN", "undefined", "", undefined, null].includes(qty)
    ) {
      return 1;
    }
    return qty;
  };

  const getStitchingDataFormate = ({
    title,
    value,
    noOfPanel,
    stitchingPrice,
    stitchingCost,
    totalFabricInM,
    totalPrice,
    dis,
    grandTotal,
    weightPrice,
    handHammingPrice,
    curtainStyle,
    totalDiscount,
    leadChainPrice,
  }) => {
    return {
      title,
      value,
      noOfPanel,
      stitchingPrice,
      stitchingCost,
      totalFabricInM,
      totalPrice,
      dis,
      grandTotal,
      weightPrice,
      handHammingPrice,
      curtainStyle,
      totalDiscount,
      leadChainPrice,
    };
  };

  const getRoomStyles = (room) => {
    const roomDetail = room?.roomInfo;

    const getDataFromRoomByKey = (key) => {
      if (key && room[key]) {
        return room[key];
      }
    };

    const getDataFromFabric = ({
      fabric,
      title,
      nameKey = "fabric1_name",
      isPriceSquareMeter,
      curtainStyle,
      widthInFeet,
      qty,
      totalFabricInM,
    }) => {
      return getMaterialFormate({
        title: title,
        value: fabric[nameKey] ? fabric[nameKey] : "",
        type: fabric?.type,
        unit: fabric?.unit,
        mrp: isPriceSquareMeter ? "" : fabric?.mrp ? fabric?.mrp : "",
        dis: fabric?.discount ? fabric?.discount : "",
        noOfPanel: fabric?.number_of_panel ? fabric?.number_of_panel : "",
        stitchingCost: fabric?.stitchingCost
          ? getPriceFormate(fabric?.stitchingCost)
          : "",
        stitchingPrice: getPriceFormate(fabric?.stitchinPrice),
        totalDiscount: getPriceFormate(fabric?.discountedAmount),
        totalFabricInM: totalFabricInM
          ? totalFabricInM
          : getTotalFabric(fabric?.totalFabricUse),
        grandTotal: fabric?.netAmount ? getPriceFormate(fabric?.netAmount) : "",
        curtainStyle: curtainStyle
          ? curtainStyle
          : fabric?.curtain_style
          ? fabric?.curtain_style?.curtainStyle
          : "",
        totalPrice: fabric?.gross_amount
          ? getPriceFormate(fabric?.gross_amount)
          : "",
        totalTax: fabric?.tax_amount ? getPriceFormate(fabric?.tax_amount) : "",
        qty: qty
          ? getQty(qty)
          : fabric?.number_of_item
          ? getQty(fabric?.number_of_item)
          : "",
        widthInFeet: widthInFeet
          ? widthInFeet
          : fabric?.width
          ? getTotalFabric(fabric?.width)
          : "",
        tax: fabric?.tax ? fabric?.tax : "",
        fittingCharge: fabric?.fittingCharges
          ? getPriceFormate(fabric?.fittingCharges)
          : "",
        hardwareSqmt: isPriceSquareMeter
          ? fabric?.mrp
            ? fabric?.mrp
            : ""
          : "",
      });
    };

    const getDataForStitching = ({
      fabric,
      title,
      curtainStyle,
      leadChainPrice = 0,
      _stitchingCost = 0,
      _stitchingPrice = 0,
      noOfPanel = 0,
      _weightPrice = 0,
      _totalAmount = 0,
      _handHammingPrice = 0,
    }) => {
      const getStitchingPrice = () => {
        if (_stitchingPrice) {
          return _stitchingPrice;
        }
        return getPriceFormate(fabric?.stitchinPrice);
      };

      const getTotalStitchingCost = () => {
        if (_stitchingCost) {
          return _stitchingCost;
        }
        return fabric?.curtain_style_cost
          ? getPriceFormate(fabric?.curtain_style_cost)
          : 0;
      };

      if (fabric) {
        const stitchingCost = getTotalStitchingCost();
        const handHammingPrice = _handHammingPrice
          ? _handHammingPrice
          : fabric?.handHammering_cost
          ? fabric?.handHammering_cost
          : 0;
        const weightPrice = _weightPrice
          ? _weightPrice
          : fabric?.weight_price
          ? fabric?.weight_price
          : 0;
        const totalDiscount = getPriceFormate(fabric?.discountedAmount);

        const getTotalAmount = () => {
          if (_totalAmount) {
            return _totalAmount;
          }
          return getPriceFormate(
            +stitchingCost + +handHammingPrice + +weightPrice + +leadChainPrice
          );
        };

        const getNetAmount = () => {
          const totalPrice = getTotalAmount();
          return getPriceFormate(totalPrice + totalDiscount);
        };

        return getStitchingDataFormate({
          title: title,
          noOfPanel: noOfPanel
            ? noOfPanel
            : fabric?.number_of_panel
            ? fabric?.number_of_panel
            : "",
          stitchingCost: stitchingCost,
          stitchingPrice: getStitchingPrice(),
          totalPrice: getTotalAmount(),
          handHammingPrice: handHammingPrice,
          weightPrice: weightPrice,
          curtainStyle: curtainStyle
            ? curtainStyle
            : fabric?.curtain_style
            ? fabric?.curtain_style?.curtainStyle
            : "",
          dis: fabric?.discount ? fabric?.discount : "",
          totalDiscount: totalDiscount,
          grandTotal: getNetAmount(),
          leadChainPrice: leadChainPrice,
        });
      }
      return undefined;
    };

    const window = [];

    const getAssetDataByKey = (assets = [], index, key) => {
      if (assets && assets?.length > 0 && assets[index] && assets[index][key]) {
        return assets[index][key];
      }
      return "";
    };

    const getBlindMinimumWidth = (blindData) => {
      if (blindData) {
        const top_width = blindData?.blind_width_top
          ? blindData?.blind_width_top
          : "";
        const middle_width = blindData?.blind_width_middle
          ? blindData?.blind_width_middle
          : "";
        const bottom_width = blindData?.blind_width_bottom
          ? blindData?.blind_width_bottom
          : "";
        const width = Math.min(...[top_width, middle_width, bottom_width]);
        return width;
      }
      return 0;
    };

    const getBlindMinimumHeight = (blindData) => {
      if (blindData) {
        const left_height = blindData?.blind_drop_left
          ? blindData?.blind_drop_left
          : "";
        const right_height = blindData?.blind_drop_right
          ? blindData?.blind_drop_right
          : "";
        const blind_drop_middle = blindData?.blind_drop_middle
          ? blindData?.blind_drop_middle
          : "";

        const height = Math.min(
          ...[left_height, right_height, blind_drop_middle]
        );
        return height;
      }
      return 0;
    };

    if (roomDetail) {
      const windowList = Array(roomDetail?.numberOfWindow).fill(1);
      const room_assets = roomDetail?.room_assets
        ? [...roomDetail?.room_assets]
        : [];

      windowList.map((_, index) => {
        const assetId = _["assetId"] ? _["assetId"] : undefined;
        const window_width = getAssetDataByKey(room_assets, index, "width");
        const window_height = getAssetDataByKey(room_assets, index, "height");
        const obj = {};
        obj["width"] = window_width;
        obj["height"] = window_height;
        const fabricList = [];
        const hardwareList = [];
        const stitchingList = [];
        const blindHardwareList = [];
        const blindStitchingList = [];

        const blindData = {};

        const curtain = getDataFromRoomByKey("curtain");
        const rod = getDataFromRoomByKey("rod");
        const track = getDataFromRoomByKey("track");
        const sheer = getDataFromRoomByKey("sheer");
        const blind = getDataFromRoomByKey("blind");
        const extraHardware = getDataFromRoomByKey("extra_hardware");

        if (curtain) {
          if (curtain?.fabric1 && curtain?.fabric1[index]) {
            const fabric = curtain?.fabric1[index];
            fabricList.push(
              getDataFromFabric({
                fabric: fabric,
                title: "Main curtain fabric1",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Main Curtain stitching",
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.fabric2 && curtain?.fabric2[index]) {
            const fabric = curtain?.fabric2[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Main curtain fabric2",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Main Curtain stitching 2",
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.mock_fabric && curtain?.mock_fabric[index]) {
            const fabric = curtain?.mock_fabric[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Mock curtain fabric",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Mock Curtain stitching",
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.lining_fabric && curtain?.lining_fabric[index]) {
            const fabric = curtain?.lining_fabric[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Lining fabric",
                curtainStyle: fabric?.curtain_style,
              })
            );
          }
          if (curtain?.belt && curtain?.belt[index]) {
            const fabric = curtain?.belt[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Belt fabric",
                nameKey: "fabric1_name",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Belt fabric stitching",
              _stitchingCost: fabric?.stitchinPrice ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }

          if (curtain?.beltBorder && curtain?.beltBorder[index]) {
            const fabric = curtain?.beltBorder[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Belt border fabric",
                nameKey: "fabric1_name",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Belt border stitching",
              _stitchingCost: fabric?.stitchinPrice ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }

          if (curtain?.beltPiping && curtain?.beltPiping[index]) {
            const fabric = curtain?.beltPiping[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Belt piping fabric",
                nameKey: "fabric1_name",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Belt piping stitching",
              _stitchingCost: fabric?.stitchinPrice ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }

          if (curtain?.primary_border && curtain?.primary_border[index]) {
            const fabric = curtain?.primary_border[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Primary border fabric",
                nameKey: "fabric1_name",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Primary border stitching",
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.secondary_border && curtain?.secondary_border[index]) {
            const fabric = curtain?.secondary_border[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Secondary border fabric",
                nameKey: "fabric1_name",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Secondary border stitching",
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.pelmet && curtain?.pelmet[index]) {
            const fabric = curtain?.pelmet[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: "Pelmet fabric",
                nameKey: "fabric1_name",
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Pelmet stitching with fitting charge",
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
              noOfPanel: fabric?.width ? `${fabric?.width} ft` : "",
              _weightPrice: fabric?.fittingCharges,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
        }
        if (sheer) {
          if (sheer?.fabric && sheer?.fabric[index]) {
            const fabric = sheer?.fabric[index];
            fabricList.push(
              getDataFromFabric({
                fabric: fabric,
                title: "Sheer fabric",
                curtainStyle: fabric?.curtain_style,
              })
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Sheer Curtain stitching",
              leadChainPrice: fabric?.leadChain_cost,
              noOfPanel: fabric?.number_of_panel,
              _stitchingPrice: fabric?.stitchinPrice,
              _stitchingCost: fabric?.stitchingCost,
              _totalAmount: fabric?.stitchingCost,
              _handHammingPrice: fabric?.handHammeringStiching,
              curtainStyle: fabric?.curtain_style,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
        }
        if (true && index === 0) {
          if (rod) {
            if (rod?.primary_rod && rod?.primary_rod[index]) {
              const fabric = rod?.primary_rod[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Primary rod",
                  isPriceSquareMeter: true,
                })
              );
            }
            if (rod?.secondary_rod && rod?.secondary_rod[index]) {
              const fabric = rod?.secondary_rod[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Secondary rod",
                  isPriceSquareMeter: true,
                })
              );
            }
            if (rod?.finial && rod?.finial[index]) {
              const fabric = rod?.finial[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Rod Finial",
                })
              );
            }
            if (rod?.curtainStick && rod?.curtainStick[index]) {
              const fabric = rod?.curtainStick[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Rod curtain stick",
                })
              );
            }
            if (rod?.endCapWallSupport && rod?.endCapWallSupport[index]) {
              const fabric = rod?.endCapWallSupport[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Rod end cap wall support",
                })
              );
            }
            if (rod?.extraBracket && rod?.extraBracket[index]) {
              const fabric = rod?.extraBracket[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Rod extra bracket",
                })
              );
            }
            if (rod?.endCap && rod?.endCap[index]) {
              const fabric = rod?.endCap[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Rod end cap",
                })
              );
            }
            if (rod?.rodTieKnob && rod?.rodTieKnob[index]) {
              const fabric = rod?.rodTieKnob[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Rod tie knob",
                })
              );
            }
          }
          if (track) {
            if (track?.primary_track && track?.primary_track[index]) {
              const fabric = track?.primary_track[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Primary Track",
                  isPriceSquareMeter: true,
                })
              );
            }
            if (track?.primaryTrackMotor && track?.primaryTrackMotor[index]) {
              const fabric = track?.primaryTrackMotor[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Primary Track motor",
                  widthInFeet: "0",
                })
              );
            }
            if (track?.primaryTrackRemote && track?.primaryTrackRemote[index]) {
              const fabric = track?.primaryTrackRemote[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Primary Track motor remote",
                  qty: fabric?.totalFabricUse,
                  widthInFeet: "0",
                })
              );
            }
            if (track?.primary_overlapper && track?.primary_overlapper[index]) {
              const fabric = track?.primary_overlapper[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Primary Track over lapper",
                })
              );
            }
            if (
              track?.primary_track_curatin_stick &&
              track?.primary_track_curatin_stick[index]
            ) {
              const fabric = track?.primary_track_curatin_stick[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Primary Track curtain stick",
                })
              );
            }
            if (
              track?.primary_extra_track_bracket &&
              track?.primary_extra_track_bracket[index]
            ) {
              const fabric = track?.primary_extra_track_bracket[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Primary Track extra bracket",
                })
              );
            }

            if (track?.Lbracket && track?.Lbracket[index]) {
              const fabric = track?.Lbracket[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "L bracket",
                })
              );
            }
            if (
              track?.primary_track_tieknob &&
              track?.primary_track_tieknob[index]
            ) {
              const fabric = track?.primary_track_tieknob[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Primary track tie knob",
                })
              );
            }
            if (
              track?.secondary_track_data &&
              track?.secondary_track_data[index]
            ) {
              const fabric = track?.secondary_track_data[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Secondary Track",
                  isPriceSquareMeter: true,
                })
              );
            }
            if (
              track?.secondaryTrackMotor &&
              track?.secondaryTrackMotor[index]
            ) {
              const fabric = track?.secondaryTrackMotor[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Secondary Track motor",
                  widthInFeet: "0",
                })
              );
            }
            if (
              track?.secondaryTrackRemote &&
              track?.secondaryTrackRemote[index]
            ) {
              const fabric = track?.secondaryTrackRemote[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Secondary Track motor remote",
                  qty: fabric?.totalFabricUse,
                  widthInFeet: "0",
                })
              );
            }
            if (
              track?.secondary_overlappper &&
              track?.secondary_overlappper[index]
            ) {
              const fabric = track?.secondary_overlappper[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Secondary track over lapper",
                })
              );
            }
            if (
              track?.secondary_track_curatin_stick &&
              track?.secondary_track_curatin_stick[index]
            ) {
              const fabric = track?.secondary_track_curatin_stick[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Secondary track curtain stick",
                })
              );
            }
            if (
              track?.secondary_extra_track_bracket &&
              track?.secondary_extra_track_bracket[index]
            ) {
              const fabric = track?.secondary_extra_track_bracket[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Secondary track extra bracket",
                })
              );
            }
            if (track?.mock_track && track?.mock_track[index]) {
              const fabric = track?.mock_track[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Mock track",
                  isPriceSquareMeter: true,
                })
              );
            }
            if (track?.mockTrackMotor && track?.mockTrackMotor[index]) {
              const fabric = track?.mockTrackMotor[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Mock Track motor",
                  widthInFeet: "0",
                })
              );
            }
            if (track?.mockTrackRemote && track?.mockTrackRemote[index]) {
              const fabric = track?.mockTrackRemote[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Mock Track motor remote",
                  qty: fabric?.totalFabricUse,
                  widthInFeet: "0",
                })
              );
            }
            if (track?.mock_overlappper && track?.mock_overlappper[index]) {
              const fabric = track?.mock_overlappper[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Mock track over lapper",
                })
              );
            }
            if (
              track?.mock_track_curatin_stick &&
              track?.mock_track_curatin_stick[index]
            ) {
              const fabric = track?.mock_track_curatin_stick[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Mock track curtain stick",
                })
              );
            }
          }
          if (true) {
            // for extra hardware
            if (extraHardware && extraHardware?.extra_hardware) {
              const fabric = extraHardware?.extra_hardware;
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Extra hardware",
                })
              );
            }
          }
        }

        if (blind) {
          const blindList = [];

          const blind_width = getBlindMinimumWidth(
            getAssetDataByKey(room_assets, index, "blind_asset")
          );
          const blind_height = getBlindMinimumHeight(
            getAssetDataByKey(room_assets, index, "blind_asset")
          );
          blindData["width"] = blind_width;
          blindData["height"] = blind_height;

          if (blind?.blindFabricArr && blind?.blindFabricArr[index]) {
            const fabric = blind?.blindFabricArr[index];
            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: "Blind fabric",
              })
            );
            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Blind fabric stitching",
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
            });
            if (stitchingData) {
              blindStitchingList.push(stitchingData);
            }
          }
          if (blind?.blindLiningArr && blind?.blindLiningArr[index]) {
            const fabric = blind?.blindLiningArr[index];
            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: "Blind Lining",
              })
            );
          }
          if (
            blind?.blind_type_search_fabric &&
            blind?.blind_type_search_fabric[index]
          ) {
            const fabric = blind?.blind_type_search_fabric[index];
            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: "Blind type",
              })
            );
          }
          if (blind?.blindShadesArr && blind?.blindShadesArr[index]) {
            const fabric = blind?.blindShadesArr[index];
            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: "Blind Shades / Blind pelmet",
              })
            );
          }
          if (
            blind?.blindBorderFabricArr &&
            blind?.blindBorderFabricArr[index]
          ) {
            const fabric = blind?.blindBorderFabricArr[index];
            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: "Blind border fabric",
              })
            );
            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: "Blind Border stitching",
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
            });
            if (stitchingData) {
              blindStitchingList.push(stitchingData);
            }
          }

          if (true) {
            //for blind hardware
            if (blind?.blindTrack && blind?.blindTrack[index]) {
              const fabric = blind?.blindTrack[index];
              blindHardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Blind track",
                  isPriceSquareMeter: true,
                  qty: `${
                    getPriceFormate(fabric?.width) > 0
                      ? getPriceFormate(fabric?.width) + " ft"
                      : ""
                  }`,
                })
              );
            }
            if (blind?.blind_track_motor && blind?.blind_track_motor[index]) {
              const fabric = blind?.blind_track_motor[index];
              blindHardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Blind track motor",
                  isPriceSquareMeter: true,
                })
              );
            }
            if (blind?.blindTrackRemote && blind?.blindTrackRemote[index]) {
              const fabric = blind?.blindTrackRemote[index];
              blindHardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Blind track motor remote",
                  isPriceSquareMeter: true,
                  qty: fabric?.totalFabricUse,
                  widthInFeet: "0",
                  totalFabricInM: " ",
                })
              );
            }
            if (blind?.blindExtraBracket && blind?.blindExtraBracket[index]) {
              const fabric = blind?.blindExtraBracket[index];
              blindHardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: "Blind extra bracket",
                  isPriceSquareMeter: true,
                  qty: fabric?.totalFabricUse,
                  widthInFeet: "0",
                  totalFabricInM: " ",
                })
              );
            }
          }
          blindData["blindList"] = blindList;
          blindData["blindHardwareList"] = blindHardwareList;
          blindData["blindStitchingList"] = blindStitchingList;
        }

        obj["fabricList"] = fabricList;
        obj["hardwareList"] = hardwareList;
        obj["blind"] = blindData;
        obj["stitchingList"] = stitchingList;

        window.push(obj);
      });
    }

    //Helper.log("window", window)
    return window;
  };

  const depositAmount = EnquiryDetials?.amount ? EnquiryDetials?.amount : 0;

  const getTotalRoomAmount = (roomsList = []) => {
    return roomsList?.reduce((sum, room) => {
      const roomStyles = getRoomStyles(room);
      sum =
        sum +
        roomStyles?.reduce((res, roomStyle) => {
          return (res = +res + +getTotalWindowPrice(roomStyle));
        }, 0);
      return sum;
    }, 0);
  };

  const totalEnquiryAmount = getTotalRoomAmount(rooms);

  const getCategoryNames = (room) => {
    if (room) {
      const cates = room?.roomInfo?.selectedMaterial
        ? [...room?.roomInfo?.selectedMaterial]
        : [];
      const data = [];
      cates.map((item) => {
        if (item?.material?.name) {
          data.push(item?.material?.name);
        }
      });
      return data.join(", ");
    }
    return "";
  };

  const renderTotalEnquiryAmount = (amount, deposit = 0, ladder) => {
    const ladderCharge = ladder?.price;
    console.log("labberrrr", ladder);
    const getGrandTotal = () => {
      if (deposit && +deposit > 0) {
        return +ladderCharge + amount - +deposit;
      }
      return +ladderCharge + amount;
    };
    if (amount < 0) {
      return ``;
    }
    return (
      <>
        <tr>
          <th colSpan={2}>Total Room amount</th>
          <th colSpan={1}>{getPriceFormate(amount)}</th>
        </tr>
        {+deposit > 0 ? (
          <tr>
            <th colSpan={2}>Deposit amount</th>
            <th colSpan={1}>{deposit}</th>
          </tr>
        ) : (
          ``
        )}

        {ladder?.name ? (
          <tr>
            <th colSpan={1}>
              <p>
                Ladder charge ({ladder?.name})
                <br />
                <span style={{ color: "red" }}>{ladder?.message}</span>
              </p>
            </th>
            <th colSpan={1}>{getPriceFormate(ladder?.price)}</th>
          </tr>
        ) : (
          ``
        )}
        <tr>
          <th colspan="2">Grand total</th>
          <th colspan="1">{getPriceFormate(getGrandTotal())}</th>
        </tr>
      </>
    );
  };

  const renderHeaderDetails = (title = "", value = "") => {
    return (
      <div style={{ display: "flex" }}>
        <p
          style={{
            marginRight: 30,
            paddingLeft: 20,
            paddingTop: 5,
          }}
        >
          {title}
        </p>
        <p
          style={{
            marginRight: 30,
            paddingLeft: 20,
            paddingTop: 5,
          }}
        >
          {value}
        </p>
      </div>
    );
  };

  const getDate = () => {
    console.log("getAllEstimateData", EnquiryDetials.createdAt);
    if (EnquiryDetials?.createdAt) {
      return moment(EnquiryDetials?.createdAt).format("DD - MMM - YYYY");
    }
    return "";
  };

  const getIcName = () => {
    if (icUser?.firstName) {
      return icUser?.firstName + " " + icUser?.lastName;
    }
    return "";
  };
  const getName = () => {
    if (customer?.firstName) {
      return customer?.firstName + " " + customer?.lastName;
    }
    return "";
  };

  const getAddress = () => {
    if (customer?.addresses && customer?.addresses?.length > 0) {
      if (customer?.addresses[0]?.address) {
        return customer?.addresses[0]?.address;
      }
      if (customer?.addresses[0]?.street) {
        return customer?.addresses[0]?.street;
      }
    }
    return "Not found";
  };

  const id = EnquiryDetials?.id;
  const icUser = EnquiryDetials?.user ?? "";
  const customer = EnquiryDetials?.customer ?? "";
  const contactNumber = customer?.primary_phone ?? "";
  const email = customer?.primary_email ?? "";
  const Gst = customer?.GST ?? "Not found";

  return (
    <div>
      {Loading === true ? (
        <Loader />
      ) : (
        <div className="Estimate">
          <div style={{ position: "fixed", bottom: 30, right: 30 }}>
            <button className="btn btn-primary" onClick={() => window.print()}>
              Print Estimate
            </button>
          </div>
          <div>
            <table
              border={0}
              cellPadding={0}
              cellSpacing={0}
              className="nl-container"
              role="presentation"
              style={{
                msoTableLspace: "0pt",
                msoTableRspace: "0pt",
                backgroundColor: "#fbfbfb",
              }}
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border={0}
                      cellPadding={0}
                      cellSpacing={0}
                      className="row row-1"
                      role="presentation"
                      style={{ msoTableLspace: "0pt", msoTableRspace: "0pt" }}
                      width="100%"
                    >
                      <tbody>
                        <table
                          align="center"
                          border={0}
                          cellPadding={0}
                          cellSpacing={0}
                          className="row-content stack"
                          role="presentation"
                          style={{
                            msoTableLspace: "0pt",
                            msoTableRspace: "0pt",
                            backgroundColor: "#efefef",
                            color: "#000000",
                            borderRadius: 0,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <div>
                              {renderHeaderDetails("Date", getDate())}
                              {renderHeaderDetails("Quotation No", "1234")}
                              {renderHeaderDetails("Enquiry No", id)}
                              {renderHeaderDetails("Sales Person", getIcName())}
                              {renderHeaderDetails("Client Name", getName())}

                              {renderHeaderDetails("Contact No", contactNumber)}
                              {renderHeaderDetails("Address ", getAddress())}
                              {renderHeaderDetails("Email", email)}
                              {renderHeaderDetails("GST No", Gst)}
                            </div>
                            <div
                              align="center"
                              className="alignment"
                              style={{ lineHeight: 10, padding: 20 }}
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/fandf-959a7.appspot.com/o/logo.png?alt=media&token=60315c89-46b8-45c9-9c72-9ebafdfc8961"
                                style={{
                                  display: "block",
                                  height: "auto",
                                  border: 0,
                                  width: 165,
                                  maxWidth: "100%",
                                }}
                                width={165}
                              />
                            </div>
                          </div>
                        </table>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style={{
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingBottom: "5%",
              }}
            >
              {console.log("room length", rooms)}
              {rooms?.length > 0
                ? rooms?.map((room, roomIndex) => {
                    const styles = getRoomStyles(room);

                    return (
                      <table className="table">
                        {roomIndex === 0 ? (
                          <tr>
                            <th>Room name</th>

                            <th>Category</th>
                            <th>Room description</th>
                          </tr>
                        ) : (
                          ``
                        )}
                        <tr>
                          <td>{room?.roomInfo?.roomName}</td>

                          <td>{getCategoryNames(room)}</td>
                          <td>
                            {styles?.map((roomStyle, styleIndex) => {
                              const totalRoom = getTotalWindowPrice(roomStyle);

                              return (
                                <table class="table">
                                  {renderRoomCurtain(roomStyle, styleIndex)}
                                  {renderStitchingCost(roomStyle)}
                                  {renderRoomHardware(roomStyle, styleIndex)}
                                  {renderRoomBlind(roomStyle, styleIndex)}
                                  {renderBlindStitchingCost(
                                    roomStyle,
                                    styleIndex
                                  )}
                                  {renderBlindHardware(roomStyle, styleIndex)}
                                </table>
                              );
                            })}
                          </td>
                        </tr>

                        {roomIndex === rooms.length - 1
                          ? renderTotalEnquiryAmount(
                              totalEnquiryAmount,
                              depositAmount,
                              getLadder()
                            )
                          : ``}
                      </table>
                    );
                  })
                : ``}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEstimate;
