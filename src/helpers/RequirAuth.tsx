import { ReactNode } from "react";
import Logged from "../components/logged/Logged";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const RequirAuth = ({ children }: { children: ReactNode }) => {
    const token = useSelector((s: RootState) => s.user.token);
    if (!token) {
        return <Logged />;
    }
    return children;
};

export default RequirAuth;
