import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'


const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
      margin: 12,
    },
    subtitle: {
      fontSize: 14,
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


export default function WarrentyForm(props){
    console.log(props.warranty)
    const warranty = props.warranty
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.title}>Warranty Form</Text>
                    <Text style={styles.subtitle}>{warranty.adescription1}</Text>
                    <Text style={styles.subtitle}>
                        {`${warranty.adescription2}, ${warranty.adescription3} ${warranty.adescription4}`}
                    </Text>
                </View>
                <View>
                    <Text style={styles.header}>Company Information</Text>
                    <Text style={styles.text}>Name: {warranty.companyname}</Text>
                    <Text style={styles.text}>ID: {warranty.companyuniqid}</Text>
                    <Text style={styles.text}>Tenant: {warranty.tenant}</Text>
                </View>
                <View>
                    <Text style={styles.header}>Transactions</Text>
                    <Text style={styles.text}>Warranty Amount: {warranty.warrantyamount}</Text>
                    <Text style={styles.text}>Total Reduce: {warranty.totaltoreduce}</Text>
                    <Text style={styles.text}>Return: {warranty.return}</Text>
                </View>
                <View>
                    <Text style={styles.header}>Costs</Text>
                    {warranty.transactions
                        ? warranty.transactions.map((t, i) => {
                            return (
                                <Text key={i} style={styles.text}>
                                    {`${t.concept} - ${t.amount}`}
                                </Text>
                            )})
                        : null
                    }
                </View>
            </Page>
        </Document>
    )
}
