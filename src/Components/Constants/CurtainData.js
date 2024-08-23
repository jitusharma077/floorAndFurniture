import React from "react";


export const StylePropsTypes = {
  track: "track",
  motor_type: "motor_type",
  weight: "weight",
  handHamming: "handHamming",
  led_chain: "led_chain",
  bracket: "bracket",
  extra_ring: "extra_ring",
  num_of_ring: "num_of_ring",
  extra_bracket: "extra_bracket",
  tie_nobs: "tie_nobs",
  belt: "belt",
  pelmet: "pelmet",
  rod: "rod",
  bracket_size: "bracket_size",
  screw_size: "screw_size",
  border: "border",
  L_bracket: "L_bracket",
  no_of_L_bracket: "no_of_L_bracket",
  over_loper: "over_loper",
  end_cap: "end_cap",
  curtain_stick: "curtain_stick",
  width: "width",
  repeat_horizontal: "repeat_horizontal",
  repeat_vertical: "repeat_vertical",
  brand: "brand",
  book: "book",
  repeat: "repeat",
  track_type: "track_type",
  manual: "manual",
  motorized: "motorized",
  track_type: "track_type",
  no_of_panel: "no_of_panel",
  total_fabric: "total_fabric",
  total_lining: "total_lining",
  selectedListValue: "selectedListValue",
  valueStyle: "valueStyle",

  pelmet_width: "pelmet_width",
  pelmet_drop: "pelmet_drop",
  pelmet_turning: "pelmet_turning",
  soft: "Soft",
  hard: "Hard",
  gathering: "gathering",
  beltLength: "beltLength",


  single: "single",
  double: "double",



  //options list
  trackChannelList: "trackChannelList",
  trackList: "trackList",
  motorOperationList: "motorOperationList",
  tieKnobList: "tieKnobList",
  fabricList: "fabricList",
  motorTypeList: "motorTypeList",
  bracketSizeList: "bracketSizeList",
  rodList: "rodList",
  finialList: "finialList",
  screwList: "screwList",
  rodBracketSingleList: "rodBracketSingleList",
  rodBracketDoubleList: "rodBracketDoubleList",


  // for hardware
  track_required: "track_required",
  trackChannelType: "trackChannelType",
  primary_track_type: "primary_track_type",
  primary_track_length: "primary_track_length",
  primary_track_motor_type: "primary_track_motor_type",
  primary_track_motor_operation: "primary_track_motor_operation",
  primary_extra_track_bracket_required: "primary_extra_track_bracket_required",
  primary_extra_track_bracket_quantity: "primary_extra_track_bracket_quantity",
  primary_track_over_lapper_required: "primary_track_over_lapper_required",
  primary_track_over_lapper_quantity: "primary_track_over_lapper_quantity",
  primary_track_screw_required: "primary_track_screw_required",
  primary_track_screw_size: "primary_track_screw_size",
  primary_track_l_bracket_required: "primary_track_l_bracket_required",
  primary_track_l_bracket_size: "primary_track_l_bracket_size",
  primary_track_l_bracket_quantity: "primary_track_l_bracket_quantity",
  primary_track_curtain_stick_required: "primary_track_curtain_stick_required",
  primary_track_curtain_stick_quantity: "primary_track_curtain_stick_quantity",
  primary_track_tie_knob_required: "primary_track_tie_knob_required",
  primary_track_tie_knob_size: "primary_track_tie_knob_size",
  primary_track_images: "primary_track_images",

  secondary_track_type: "secondary_track_type",
  secondary_track_motor_type: "secondary_track_motor_type",
  secondary_track_length: "secondary_track_length",
  secondary_track_motor_operation: "secondary_track_motor_operation",
  secondary_track_extra_bracket_required: "secondary_track_extra_bracket_required",
  secondary_track_extra_bracket_quantity: "secondary_track_extra_bracket_quantity",
  secondary_track_over_lapper_required: "secondary_track_over_lapper_required",
  secondary_track_over_lapper_quantity: "secondary_track_over_lapper_quantity",
  secondary_track_curtain_stick_required: "secondary_track_curtain_stick_required",
  secondary_track_curtain_stick_quantity: "secondary_track_curtain_stick_quantity",
  secondary_track_tie_knob_required: "secondary_track_tie_knob_required",
  secondary_track_tie_knob_size: "secondary_track_tie_knob_size",
  secondary_track_images: "secondary_track_images",


  //rod bracket size types

  small: "small",
  long: "long",
  double: "double",

  // This is for rod
  rodChannelType: "rodChannelType",
  rod_required: "rod_required",
  primary_rod_type: "primary_rod_type",
  primary_rod_length: "primary_rod_length",
  primary_rod_extra_bracket_required: "primary_rod_extra_bracket_required",
  primary_rod_extra_bracket_size: "primary_rod_extra_bracket_size",
  primary_rod_extra_bracket_quantity: "primary_rod_extra_bracket_quantity",
  primary_rod_extra_bracket_support_required: "primary_rod_extra_bracket_support_required",
  primary_rod_extra_bracket_support_quantity: "primary_rod_extra_bracket_support_quantity",
  primary_rod_ring_required: "primary_rod_ring_required",
  primary_rod_ring_quantity: "primary_rod_ring_quantity",
  primary_rod_tie_knob_required: "primary_rod_tie_knob_required",
  primary_rod_tie_knob_size: "primary_rod_tie_knob_size",
  primary_rod_finial_required: "primary_rod_finial_required",
  primary_rod_finial_size: "primary_rod_finial_size",
  primary_rod_finial_quantity: "primary_rod_finial_quantity",
  primary_rod_end_cap_required: "primary_rod_end_cap_required",
  primary_rod_end_cap_quantity: "primary_rod_end_cap_quantity",
  primary_rod_end_cap_wall_support_required: "primary_rod_end_cap_wall_support_required",
  primary_rod_end_cap_wall_support_quantity: "primary_rod_end_cap_wall_support_quantity",
  primary_rod_curtain_stick_required: "primary_rod_curtain_stick_required",
  primary_rod_curtain_stick_quantity: "primary_rod_curtain_stick_quantity",
  primary_rod_images: "primary_rod_images",

  secondary_rod_length: "secondary_rod_length",
  secondary_rod_type: "secondary_rod_type",
  secondary_rod_images: "secondary_rod_images",


  mock_track_type: "mock_track_type",
  mock_track_length: "mock_track_length",
  mock_track_function: "mock_track_function",
  mock_motor_operation: "mock_motor_operation",
  mock_extra_track_bracket_required: "mock_extra_track_bracket_required",
  mock_extra_track_bracket_quantity: "mock_extra_track_bracket_quantity",
  mock_overlappper_required: "mock_overlappper_required",
  mock_number_of_overlappper_pair: "mock_number_of_overlappper_pair",
  mock_track_curatin_stick_required: "mock_track_curatin_stick_required",
  mock_track_curatin_stick_pair: "mock_track_curatin_stick_pair",
  mock_tie_knobs_required: "mock_tie_knobs_required",
  mock_track_tieknobId: "mock_track_tieknobId",
  mock_track_image: "mock_track_image",


  // for blinds
  blind_style: "blind_style",
  blind_sub_type: "blind_sub_type",
  blind_fitting_type: "blind_fitting_type",
  blind_window_type: "blind_window_type",
  blind_fabric: "blind_fabric",
  blind_fabric_images: "blind_fabric_images",
  blind_fabric_required: "blind_fabric_required",
  blind_shade_required: "blind_shade_required",
  blind_shade: "blind_shade",
  blind_style_fabric: "blind_style_fabric",
  blind_type_motor: "blind_type_motor",

  blind_lining_required: "blind_lining_required",
  blind_lining: "blind_lining",
  blind_lining_type: "blind_lining_type",
  blind_lining_width: "blind_lining_width",

  blind_hardware_required: "blind_hardware_required",
  blind_track: "blind_track",
  blind_motor_track_type: "blind_motor_track_type",
  blind_motor_type: "blind_motor_type",

  blind_border_required: "blind_border_required",
  blind_border_type: "blind_border_type",
  blind_border_fabric: "blind_border_fabric",
  blind_border_images: "blind_border_images",

  blind_style_list: "blind_style_list",
  blind_window_type_list: "blind_window_type_list",
  blind_lining_list: "blind_lining_list",
  blind_track_list: "blind_track_list",
  blind_motor_track_type_list: "blind_motor_track_type_list",
  blind_motor_type_list: "blind_motor_type_list",
  blind_border_type_list: "blind_border_type_list",

  blind_fitting_type_list: "blind_fitting_type_list",
  blind_screw_required: "blind_screw_required",
  blind_screw_size: "blind_screw_size",
  blind_extra_bracket_support_required: "blind_extra_bracket_support_required",
  blind_extra_bracket_support_quantity: "blind_extra_bracket_support_quantity",
  no_of_blind_motor_remote: "no_of_blind_motor_remote",

  extraHardware: "extraHardware",
  numOfExtraHardware: "numOfExtraHardware",
  extra_hardware_required: "extra_hardware_required",

  fabric1_ring_color: "fabric1_ring_color",
  mock_ring_color: "mock_ring_color",
  sheer_ring_color: "sheer_ring_color"
}

export const StyleLocalFields = {
  weight: {
    type: StylePropsTypes.weight,
    title: "Weight required",
  },
  handHamming: {
    type: StylePropsTypes?.handHamming,
    title: "Hand Hamming Required",
  },
  led_chain: {
    type: StylePropsTypes?.led_chain,
    title: "Lead Chain Required",
  },
  bracket: {
    type: StylePropsTypes?.bracket,
    title: "Bracket Required",
  },
  extra_ring: {
    type: StylePropsTypes?.extra_ring,
    title: "Extra Rings Required",
  },
  num_of_ring: {
    type: StylePropsTypes?.num_of_ring,
    title: "No of rings",
  },
  extra_bracket: {
    type: StylePropsTypes?.extra_bracket,
    title: "Extra Bracket",
  },
  tie_nobs: {
    type: StylePropsTypes?.tie_nobs,
    title: "Tie Knobs Required",
  },
  belt: {
    type: StylePropsTypes?.belt,
    title: "Belt Type",
  },
  pelmet: {
    type: StylePropsTypes?.pelmet,
    title: "Pelmet required",
  },
  track: {
    type: StylePropsTypes?.track,
    title: "Track required",
  },
  rod: {
    type: StylePropsTypes?.rod,
    title: "Rods required",
  },
  L_bracket: {
    type: StylePropsTypes?.L_bracket,
    title: "L bracket required",
  },
  over_loper: {
    type: StylePropsTypes?.over_loper,
    title: "Over loper is required",
  },
  end_cap: {
    type: StylePropsTypes?.end_cap,
    title: "End cap is required",
  },
  curtain_stick: {
    type: StylePropsTypes?.curtain_stick,
    title: "Curtain stick is required",
  },
  track_type: {
    type: StylePropsTypes?.track_type,
    title: "Select track type",
  },
  no_of_panel: {
    type: StylePropsTypes?.no_of_panel,
    title: "Enter number of panels",
  },
  total_fabric: {
    type: StylePropsTypes?.total_fabric,
    title: "Total fabric",
  },
  total_lining: {
    type: StylePropsTypes?.total_lining,
    title: "Total Lining",
  },
  pelmet_width: {
    type: StylePropsTypes?.pelmet_width,
    title: "Pelmet width",
  },
  pelmet_drop: {
    type: StylePropsTypes?.pelmet_drop,
    title: "Pelmet drop / height",
  },
  pelmet_turning: {
    type: StylePropsTypes?.pelmet_turning,
    title: "Turning (Only in Soft Pelmet)",
  },
  no_of_L_bracket: {
    type: StylePropsTypes?.no_of_L_bracket,
    title: "Number of bracket",
  },
  beltLength: {
    type: StylePropsTypes?.beltLength,
    title: "Enter Belt length",
  }
}

export const MaterialStyleTypes = {
  Curtain: "Curtain",
  customization_Curtain: "customization_Curtain",
  Mock: "Mock",
  Sheer: "Sheer",

  Belt: "Belt",
  BeltBorder: "BeltBorder",
  BeltPiping: "BeltPiping",

  Border: "Border",
  Pelmet: "Pelmet",
  Hardware: "Hardware",

  Lining: "Lining",
  Rods: "Rods",
  Track: "Track",

  //for second border fabric image
  Border2: "Border_two",

  Blind: "Blinds",
  Blind_fabric: "BlindFabric",
  Blind_border_fabric: "BlindBorderFabric",
  Blind_shade: "Blind_shade",

  windowImage: "windowImage",
  Blind_fabric_Image: "Blind_fabric_Image",
  Blind_Border_Image: "Blind_Border_Image",
  Blind_Border_Curtain_fabric_Image: "Blind_Border_Curtain_fabric_Image",

  Upholstery: "Upholstery",// Sofa
  Wallpaper: "Wallpaper",
  flooring: "WoodenFlooring",
  SiteImage: "SiteImage",

  PrimaryTrack: "PrimaryTrack",
  SecondaryTrack: "SecondaryTrack",
  MockTrack: "MockTrack",

  PrimaryRod: "PrimaryRod",
  SecondaryRod: "SecondaryRod"
}


export const MaterialCategoryName = {
  sheer: "sheers",
  curtain: "Curtains",
  blind: "Blinds",
  track: "Rods/tracks",
  Upholstery: "Upholstery",
  Wallpaper: "Wallpaper",
  flooring: "Flooring/Carpet"
}

export const WallpaperTypes = {
  wallpaper: "wallpaper",
  mural: "mural"
}

export const WallpaperRateTypes = {
  normal: "normal_rate",
  celling: "ceiling_rate"
}


export const UserTypes = {
  director: "Director",
  interior: "Interior",
  old: "Old",
  new: "New"
}


export const FlooringTypes = {
  carpet: "carpet",
  flooring: "flooring"
}

export const FlooringListTypes = {
  normal: "Normal flooring",
  Engineer: "Engineer Wooden",
  Herringbone: "Herringbone Flooring"
}

export const SofaSelectionType = {
  sofa: "Sofa",
  Pouffe: "Pouffee",
  BedBack: "Bedback",
  WallPanel: "Wallpanel",
  cushion: "Cushion"
}


export const OptionsStyleTypes = {
  track: {
    type: StylePropsTypes.track,
    title: "Track"
  },
  motor_type: {
    type: StylePropsTypes.motor_type,
    title: "Motor type"
  },
  bracket_size: {
    type: StylePropsTypes.bracket_size,
    title: "Bracket Size",
  },
  screw_size: {
    type: StylePropsTypes.screw_size,
    title: "Screw Size"
  },
  tie_nobs: {
    type: StylePropsTypes.tie_nobs,
    title: "Tie nobs"
  },
  rods: {
    type: StylePropsTypes.rod,
    title: "Rods"
  },
  belt: {
    type: StylePropsTypes.belt,
    title: "Belt",
  },
  border: {
    type: StylePropsTypes.border,
    title: "Border"
  }

}

export const CurtainStyleFieldTypes = {
  input: "input",
  checkbox: "checkbox",
}

export const MeasurementType = {
  windowMeasurement: "Window Measurement",
  blindMeasurement: "Blind Measurement"
}

export const CurtainStyleDataList = []


export class RoomFieldModel {
  constructor() {
    return {
      name: "name",
      window: "window",
      door: "door",
      description: "description",
      floor: "floor",
    }
  }
}

export class RoomDataModel {
  constructor() {
    return {
      title: "",
      num_of_window: "",
      num_of_door: "",
      description: "",
      floor: "",
    }
  }
}

export const RoomModel = new RoomDataModel();

export const RoomFieldTypes = new RoomFieldModel();



export const taskTypes = {
  active: {
    title: "Active Task",
    type: "active"
  },
  pending: {
    title: "Pending Task",
    type: "pending"
  },
  cancelled: {
    title: "Cancelled Task",
    type: "canceled"
  },
  completed: {
    title: "Completed Task",
    type: "completed"
  },
  wcr_completed: {
    title: "WCR Completed",
    type: "wcr_completed"
  }
}


export const OrderProofTypes = {
  warehouse: "warehouse",
}