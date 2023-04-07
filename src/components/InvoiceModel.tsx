import html2canvas from "html2canvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import jsPDF from "jspdf";

interface rowType {
  quantity: number;
  price: number;
  discountPercentage: number;
  discount: number;
  taxPercentage: number;
  tax: number;
}

interface InvoiceModalProps {
  showModal: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  rows: rowType[];
  totalAmount: number;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  rows,
  totalAmount,
}) => {

  function GenerateInvoice() {
    const input = document.getElementById("invoiceCapture") as HTMLDivElement;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792]
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice-001.pdf");
    });
  }

  return (
    <>
      <div className="card mt-5 m-auto width">
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <h4 className="my-2 fs-2">"xyz"</h4>
                <h6 className="fw-bold text-secondary mb-1 fs-2">Invoice #: 1</h6>
              </div>
              <div className="text-end ms-4">
                <h6 className="fw-bold mt-1 mb-2 fs-2">Amount&nbsp;Due:</h6>
                <h5 className="fw-bold text-secondary fs-3">{totalAmount}</h5>
              </div>
            </div>
            <div className="p-4">
              <Table className="mb-0">
                <thead>
                  <tr className="fs-4">
                    <th>QTY</th>
                    <th>Price</th>
                    <th className="text-end">Discount %</th>
                    <th className="text-end">Discount</th>
                    <th className="text-end">Tax %</th>
                    <th className="text-end">Tax </th>
                    <th className="text-end">Total </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item) => {
                    return (
                      <tr className="fs-4">
                        <td style={{ width: "70px" }}>{item.quantity}</td>
                        <td>$ {item.price}</td>
                        <td className="text-end" style={{ width: "100px" }}>
                         {item.discountPercentage} %
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.discount} 
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.taxPercentage} %
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.tax} 
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {(item.quantity * item.price) - item.discount + item.tax}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>

                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      TOTAL
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      $ {totalAmount}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row className="justify-content-center">
              <Col md={6}>
                <Button
                  variant="outline-primary"
                  className="d-block w-100 mt-3 mt-md-0"
                  onClick={GenerateInvoice}
                >
                  {/* <Button
                    style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                    className="me-2"
                  /> */}
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
      </div>
    </>
  );
};

export default InvoiceModal;
