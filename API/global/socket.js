import { Server } from "socket.io";
let io;

export default {
  initialize: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        methods: "*",
        origin: "*",
        allowedHeaders: "*",
      },
    });
  },
  getIo: () => {
    if (io === undefined || io === null) {
      throw new Error("Connection To Socket Failed !!.");
    } else {
      return io;
    }
  },
};
