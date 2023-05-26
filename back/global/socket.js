import { Server } from "socket.io";
let io;

export default {
  initialize: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: "*",
      },
    });
  },
  getSocket: () => {
    if (io === undefined || io === null) {
      throw new Error("Failed Socket Connection");
    } else {
      return io;
    }
  },
};
