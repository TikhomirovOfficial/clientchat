import Auth from "../pages/Auth";
import Index from "../pages/ChatRoom";
import ChatRoom from "../pages/ChatRoom";

export const routes = {
    privates: [
        {
            path: "/",
            Component: ChatRoom,
            exact: true
        }
    ],
    public: [
        {
            path: "/login",
            Component: Auth,
            exact: true
        }
    ]
}