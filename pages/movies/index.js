import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import { RiSearch2Line } from "react-icons/ri"
import Navbar from "../../components/Navbar"
import Axios from 'axios'
import Card from "../../components/Card"


export default function Movies ({Data}) {
  return (
    <Box bgImage='url("Background.svg")' w='100%' bgColor='#121829'>
      <Navbar />
      <Box px='70px' mt='80px'>
        <Text fontSize='16px' color='#BEB7FB'>Flix</Text>
        <Heading fontSize='64px' fontWeight='600' color='#EBEEF5'>  Movies </Heading>

        <InputGroup mt='24px' w='346px' >
          <InputLeftElement
            pt='20px' 
            children={<RiSearch2Line color='#475069'  fontSize='24px' />}/>
          <Input  outline='0' 
            _hover={{
            borderColor:'#323B54'
          }}
            _placeholder={{color:'#475069', fontSize:'16px', fontWeight: '400' }}
            border='1px solid #323B54'
            bg='#0000001A'
            focusBorderColor='none'
            color='white' h='64px' placeholder='Search Movies or TV Shows' fontSize='20px' fontWeight='' borderColor='#323B54' />
          </InputGroup>
      </Box>
      <Box px='70px' w='100%' mt='48px' pb='28px'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Text fontSize='24px' color='#ebeef5' fontWeight='600'> Now Playing</Text>
          <Text  fontSize='18px' color='#9C92F8'> { `(${Data.length}) Movies`}</Text>
        </Flex>
        <Flex wrap='wrap' justifyContent={['center','center','space-between']} alignItems='center'>
          {
            Data.map((data) => <Card key={data.id.toString()} poster={data.poster_path} rating= {data.vote_average} title={ data.title || data.name }/>)}
        </Flex>
      </Box>
    </Box>
  )
}



export async function getStaticProps() {
  const mov = await Axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.PRIVATE_KEY}&language=en-US&page=1`)
  const response = await mov.data.results

  return{
    props: {
      Data: response
    }
  }
}