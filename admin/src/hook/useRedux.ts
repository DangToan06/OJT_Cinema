import { useDispatch, type TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store/store";

export const dispatch: () => AppDispatch = useDispatch;
export const Selector: TypedUseSelectorHook<RootState> = useSelector;
