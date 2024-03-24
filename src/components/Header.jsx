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
    ,ScrollArea,
  } from "@yamada-ui/react"
import useJournals from '../hooks/useJournals.js';
import dayjs from "dayjs";
import {auth} from '../plugins/firebase.js'

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const {data, error, isLoading} = useJournals();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const uid = auth.currentUser.uid

    return (
        <Box className='HeaderComp' display='flex' justifyContent='between' alignItems='center' px='lg' zIndex='guldo'>
          <Box display='flex' gap='md' alignItems='center' flex={1}>
            <Image src='https://firebasestorage.googleapis.com/v0/b/hackson-69a0a.appspot.com/o/Creative%20Storm.png?alt=media&token=c4104bd4-3830-4bde-bd19-6a1fc5f697d0' w='36px' h='36px' />
            <Heading  textAlign='start' >AI Journal App</Heading>
          </Box>
          <Button onClick={handleOpen} className='drawer-button'>...</Button>
          <Drawer isOpen={isOpen} onClose={handleClose} placement="right" size='md'>
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
    <CardBody shadow='lg'>
        <Image width='full' height='auto' aspectRatio={1} bg='#efefef' src={v.imageURL} />
        <Box >
        <ScrollArea maxH='sm'>

          <Text>{v.content}</Text>
        </ScrollArea>
          <Box display='flex' gap='sm' mt='xs'>
            <Badge>{dayjs(v.timestamp.seconds * 1000).format('YYYY/MM/DD')}</Badge>
            {uid == v.uid && (
              <Badge colorScheme='secondary'>あなたが作成</Badge>
              )}
              </Box>
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
        </Box>
      );
}

export default Header;


