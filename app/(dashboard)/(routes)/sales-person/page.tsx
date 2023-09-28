'use client';
import SalesPersonForm from '@/components/SalesPersonForm';
import SalesPersonTable from '@/components/SalesPersonTable';

const SalePerson = () => {
  return (
    <div>
      <SalesPersonForm/>
      <div className='p-10'>
      <SalesPersonTable/>
      </div>
    </div>
  );
}

export default SalePerson