import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Search, Paperclip, ArrowUp, Image, Video, FileText, Mic, Smile } from "lucide-react"
interface Message {
    id: number;
    sender: string;
    content: string;
    time: string;
    isSent: boolean;
}

interface ChatListItem {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
}

const ChatBubble = ({ message }: { message: Message }) => {
    return (
        <div className={`flex ${message.isSent ? 'justify-end' : 'items-start'} mb-4`}>
            {!message.isSent && <Avatar className="w-8 h-8 mr-2" />}
            <div className={`flex flex-col ${message.isSent ? 'items-end' : 'items-start'}`}>
                {!message.isSent && <span className="text-sm font-semibold mb-1">{message.sender}</span>}
                <div className={`rounded-lg p-3 max-w-[70%] ${message.isSent ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                    <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">{message.time}</span>
            </div>
        </div>
    );
};

export default function Component() {

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: 'Claire',
            content: 'Hello, I wanted to know more about the product design position opened at Atlassian.',
            time: '11 days ago',
            isSent: false
        },
        {
            id: 2,
            sender: 'You',
            content: 'Hello, I wanted to know more about the product design position opened at Atlassian.',
            time: '11 days ago',
            isSent: true
        },
        {
            id: 3,
            sender: 'Claire',
            content: 'Take this part of your letter seriously because it\'s likely one of your first genuine opportunities to make a personal, positive impression on a prospective employer. You want your words to invite them to keep reading and to convey exactly why you\'re the best choice for their open position. Review your language to ensure it\'s concise and informative. If you\'re applying to multiple positions, take great care to edit your letter so that the first paragraph is personal and relevant to the exact position you want.',
            time: '11 days ago',
            isSent: false
        },
        {
            id: 4,
            sender: 'You',
            content: 'Sure, tell us. What do you wanna know?',
            time: '11 days ago',
            isSent: true
        },
        {
            id: 5,
            sender: 'Claire',
            content: 'You\'ve a good folio.',
            time: '11 days ago',
            isSent: false
        },
        {
            id: 6,
            sender: 'Claire',
            content: 'However, we\'re looking for someone with a little more experience!',
            time: '3 days ago',
            isSent: false
        }
    ]);


    const chatList: ChatListItem[] = [
        { id: 1, name: 'Claire', lastMessage: '2nd Hello, I wanted to know more about...', time: '11 days' },
        { id: 2, name: 'Parik', lastMessage: '3rd Hello, I wanted to know more about...', time: '11 days' },
        { id: 3, name: 'Naina', lastMessage: '4th Hello, I wanted to know more about...', time: '11 days' },
        { id: 4, name: 'John', lastMessage: '5th Hello, I wanted to know more about...', time: '11 days' },
        { id: 5, name: 'Kristine', lastMessage: '4th Hello, I wanted to know more about...', time: '11 days' },
    ];

    return (
        <div className="flex h-screen bg-white">
            {/* Left sidebar */}
            <div className="w-1/3 border-r flex flex-col">
                <div className="p-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input type="search" placeholder="Search" className="pl-10" />
                    </div>
                    <Tabs defaultValue="all" className="mb-4">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                            <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                            <TabsTrigger value="archived" className="text-xs">Archived</TabsTrigger>
                            <TabsTrigger value="blocked" className="text-xs">Blocked</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <ScrollArea className="flex-1">
                    {chatList.map((chat) => (
                        <div key={chat.id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
                            <Avatar className="w-10 h-10 mr-3" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-sm font-semibold truncate">{chat.name}</h3>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col">
                {/* Kristine typing status */}
                <div className="border-b p-4">
                    <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-3" />
                        <div>
                            <h2 className="font-semibold">Kristine</h2>
                            <p className="text-sm text-gray-500">Typing...</p>
                        </div>
                    </div>
                </div>

                {/* Chat messages */}
                <ScrollArea className="flex-1 p-4">
                    {messages.map((message) => (
                        <ChatBubble key={message.id} message={message} />
                    ))}
                </ScrollArea>

                {/* Input area */}
                <div className="border-t p-4">
                    <div className="relative flex items-center">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 absolute left-2">
                                    <Smile className="h-5 w-5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="top" align="start" className="w-80 h-64 p-0">
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">Emojis</h2>
                                    <ScrollArea className="h-48">
                                        <div className="grid grid-cols-8 gap-2">
                                            {/* Placeholder emojis */}
                                            {[...Array(64)].map((_, i) => (
                                                <div key={i} className="text-2xl cursor-pointer hover:bg-gray-100 rounded p-1">
                                                    😀
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Input
                            placeholder="Type your message here"
                            className="pl-12 pr-20"
                        />
                        <div className="absolute right-2 flex items-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Paperclip className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-40">
                                    <div className="flex flex-col space-y-2">
                                        <Button variant="ghost" size="sm" className="justify-start">
                                            <Image className="mr-2 h-4 w-4" />
                                            Image
                                        </Button>
                                        <Button variant="ghost" size="sm" className="justify-start">
                                            <Video className="mr-2 h-4 w-4" />
                                            Video
                                        </Button>
                                        <Button variant="ghost" size="sm" className="justify-start">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Document
                                        </Button>
                                        <Button variant="ghost" size="sm" className="justify-start">
                                            <Mic className="mr-2 h-4 w-4" />
                                            Audio
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowUp className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}