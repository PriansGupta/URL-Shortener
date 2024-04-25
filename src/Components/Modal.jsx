import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Plan from './Plan';

function CreditModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 className='font-bold tracking-wide select-none'>
                        Not enough credits left
                    </h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className='tracking-wide select-none'>Purchase a plan at starting ₹1</h4>
                <div className='flex gap-4 font-semibold tracking-wider select-none md:text-sm'>
                    <Plan price={100} credits={1000}></Plan>
                    <Plan price={500} credits={2000}></Plan>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CreditModal