/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useProductStore } from "@/store/product-store";
import { Product } from "@prisma/client";

// The 'theme' object is your Tailwind theme config
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Inter"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

export const PdfProducts = () => {
  const { products } = useProductStore();

  //   return <Pdf/>
  return (
    <PDFDownloadLink
      document={<Pdf products={products ?? []} />}
      fileName="produtos.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  );
};

type PdfProps = {
  products: Product[];
};

const styles = StyleSheet.create({
  table: {
    border: "1px solid black",
    width: "100%",
  },
  tableHeader: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#ccc",
    flexDirection: "row",
    display: 'flex',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  tableCell: {
    textAlign: "center",
  },
  tableRow: {
    borderBottom: "1px solid black",
    flexDirection: "row",
    display: 'flex',
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

const Pdf = ({ products }: PdfProps) => {
  return (
    <Document>
      <Page size="A4" style={{ backgroundColor: "white" }}>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", fontStyle: 'italic', marginBottom: 32 }}>
            Ozias Verdura
          </Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={{ width: "33%" }}>Nome</Text>
              <Text style={{ width: "33%" }}>Valor de Venda</Text>
              <Text style={{ width: "33%" }}>Valor de Compra</Text>
            </View>
            {products.map((product, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={{ width: "33%", textAlign: "center" }}>{product.name}</Text>
                <Text style={{ width: "33%", textAlign: "center" }}>{product.sellPrice}</Text>
                <Text style={{ width: "33%", textAlign: "center" }}>{product.buyPrice}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;
