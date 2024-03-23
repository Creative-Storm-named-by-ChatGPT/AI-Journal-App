import React from 'react';
import './Header.css';
import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Text,
    Box,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Image,
    Badge
  } from "@yamada-ui/react"
import useJournals from '../hooks/useJournals.js';
import dayjs from "dayjs";

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const {data, error, isLoading} = useJournals();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <header className='HeaderComp'>
          <h1>AI Journal App</h1>
          <Button onClick={handleOpen} className='drawer-button'>...</Button>
          <Drawer isOpen={isOpen} onClose={handleClose} placement="right" size='3xl'>
            <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
            <DrawerHeader>過去の日記一覧</DrawerHeader>
            <DrawerBody>
                <Text>過去に保存した日記の一覧を表示します。</Text>
                <Box>
                    {isLoading && (<Text>ローディング</Text>)}
                    {error && <Text>エラー</Text>}
                    {!data && <Text>ありません</Text>}
                    {data && data.map((v) => (
                        <Card key={v.id}>
                        <CardBody>
                            <Image width='full' src={v.imageURL} />
                            <Box >
                                <Badge>{dayjs(v.timetamp.seconds * 1000).format('YYYY/MM/DD')}</Badge>
                            </Box>
                        </CardBody>
                      </Card>
                    ))}    
                </Box> 
            </DrawerBody>
            <DrawerFooter>
              <Button variant="ghost" onClick={handleClose}>とじる</Button>
            </DrawerFooter>
          </Drawer>
        </header>
      );
}

export default Header;
