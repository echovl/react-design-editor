import { combineReducers } from "@reduxjs/toolkit";
import { designEditorReducer } from "./slices/design-editor/reducer";

const rootReducer = combineReducers({
  designEditor: designEditorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
