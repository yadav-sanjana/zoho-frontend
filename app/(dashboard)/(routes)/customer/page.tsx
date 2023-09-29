"use client"
import CustomerForm from '@/components/CustomerForm';
import CustomerTable from '@/components/CustomerTable';


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