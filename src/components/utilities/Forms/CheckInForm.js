import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'


// const styles = StyleSheet.create({
//     page: {
//         backgroundColor: 'white',
//         fontSize: '20px',
//         color: 'black',
//         padding: '20px'
//     },
//     heading: {
//         fontSize: '30px'
//     }
// })

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      margin: 12,
      textAlign: 'center'
    },
    text: {
      margin: 5,
      fontSize: 12,
      fontFamily: 'Times-Roman'
    },
    header: {
        marginTop: 30,
        fontSize: 12,
        color: '#273443',
        backgroundColor: '#d5dde6',
        padding: 8,
        borderRadius: 3
    },
    signature: {
        marginTop: 50
    },
    sign: {
        display: 'inline',
        margin: 5,
        fontSize: 12,
        fontFamily: 'Times-Roman'
    }
  });



export default function CheckInForm(props){
    console.log(props)
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.title}>{props.asset.adescription4}</Text>
                    <Text style={styles.subtitle}>
                        {`${props.asset.adescription5}, ${props.asset.adescription2} ${props.asset.adescription3}`}
                    </Text>
                </View>
                <View>
                    <Text style={styles.header}>Tenant Information</Text>
                    <Text style={styles.text}>Name: {props.asset.tenant}</Text>
                    <Text style={styles.text}>Email: {props.user.email}</Text>
                    <Text style={styles.text}>Phone: {props.user.phone}</Text>
                </View>
                <View>
                    <Text style={styles.header}>Entrega</Text>
                    {props.asset.features
                        ? props.asset.features.map(f => {
                            return (
                                <Text style={styles.text}>
                                    {`${f.type} - ${f.description}`}
                                </Text>
                            )
                        })
                    : null
                    }
                </View>
                <View>
                    <Text style={styles.header}>Features</Text>
                    {props.asset.features
                        ? props.asset.features.map(f => {
                            return (
                                <Text style={styles.text}>
                                    {`${f.type} - ${f.description}`}
                                </Text>
                            )
                        })
                    : null
                    }
                </View>
                <View style={styles.signature}>
                    <Text style={styles.text}>Please sign and date below</Text>
                    <Text style={styles.text}>Signature ___________________________________                     Date ________________________</Text>
                </View>
            </Page>
        </Document>
    )
}
