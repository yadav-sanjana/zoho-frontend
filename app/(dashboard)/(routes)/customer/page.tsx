"use client"
import CustomerForm from '@/components/customer/CustomerForm';
import CustomerTable from '@/components/customer/CustomerTable';


const CustomerPage = () => {

  return (
    <div>
        <CustomerForm />
       <div className='p-10'>
       <CustomerTable/>
       </div>
    </div>
  );
}

export default CustomerPage