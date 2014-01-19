using Fleck;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace RiftServer
{
    unsafe class Program
    {
        [DllImport(@"RiftWrapper.dll")]
        static extern int OVR_Init();
        
        [DllImport(@"RiftWrapper.dll", CallingConvention= CallingConvention.Cdecl)]
        static extern int OVR_Peek(float *w, float* x, float* y, float* z);

        [DllImport(@"RiftWrapper.dll", CallingConvention= CallingConvention.Cdecl)]
        static extern int OVR_PeekYPL(float* yaw, float* pitch, float* roll);

        unsafe static void Client(IWebSocketConnection conn)
        {
            CultureInfo culture = new System.Globalization.CultureInfo("en-US");
            Console.WriteLine("handling client");
            float w, x, y, z;
            while (conn.IsAvailable)
            {
                OVR_Peek(&w, &x, &y, &z);
                string ss = string.Format(culture,"{0},{1},{2},{3}", w,x,y,z);
                conn.Send(ss);
                System.Threading.Thread.Sleep(10);
            }
        }

        static void Main(string[] args)
        {
            OVR_Init();
            var server = new WebSocketServer("ws://localhost:1981");
            server.Start(socket =>
            {
                socket.OnOpen = () => { Console.WriteLine("Open!"); Client(socket); };
                socket.OnClose = () => Console.WriteLine("Close!");
                socket.OnMessage = message => socket.Send(message);
            });
            while (true)
            {
                System.Threading.Thread.Sleep(100);
            }
        }
    }
}
